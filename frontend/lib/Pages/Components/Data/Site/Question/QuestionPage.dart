import 'package:flutter/material.dart';
import 'package:flutter_dotenv/flutter_dotenv.dart';
import 'package:frontend/Model/Services/Site/fetchQuestion.dart';
import 'package:frontend/Pages/Components/Data/Site/Question/Context/__QuestionStore.dart';
import 'package:frontend/Pages/Components/Data/Site/Question/Context/__QuestionUpdate.dart';
import 'package:frontend/Pages/Components/Data/Site/Question/Context/__QuestionlList.dart';
import 'package:shared_preferences/shared_preferences.dart';

class QuestionPage extends StatefulWidget {
  @override
  _QuestionPageState createState() => _QuestionPageState();
}

class _QuestionPageState extends State<QuestionPage> {
  List<Map<String, dynamic>> questions = [];
  bool isLoading = false;
  late String baseUrl;

  @override
  void initState() {
    super.initState();
    initializeBaseUrl();
  }

  Future<void> initializeBaseUrl() async {
    await dotenv.load();
    baseUrl = dotenv.env['BASE_URL']!;
    await fetchQuestion();
  }

  Future<String> getTokenFromStorage() async {
    SharedPreferences prefs = await SharedPreferences.getInstance();
    return prefs.getString('token') ?? '';
  }

  Future<void> fetchQuestion() async {
    try {
      setState(() {
        isLoading = true;
      });

      questions = await ServiceQuestion.fetchQuestion(baseUrl);

      setState(() {
        isLoading = false;
      });
    } catch (e) {
      print('Error fetching question data: $e');
      setState(() {
        isLoading = false;
      });
    }
  }

  void showUpdatePage(Map<String, dynamic> question) async {
    try {
      Navigator.push(
        context,
        MaterialPageRoute(
          builder: (context) => UpdateQuestionPage(
            questionId: question['id']?.toString() ?? '',
            name: question['name'] ?? '',
            categoryId: question['category']['id'].toString(),
            categoryName: question['category']['name'],
            categories: questions
                .map<Map<String, dynamic>>((e) => e['category'])
                .toList(),
            onUpdate: () {
              fetchQuestion();
            },
            fetchNewData: fetchQuestion,
          ),
        ),
      );
    } catch (e) {
      print('Error fetching category data: $e');
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Questions'),
        backgroundColor: Colors.black,
      ),
      body: RefreshIndicator(
        color: Colors.white,
        onRefresh: fetchQuestion,
        child: isLoading
            ? const Center(
                child: CircularProgressIndicator(
                  color: Colors.white,
                ),
              )
            : QuestionList(
                questions: questions,
                onUpdate: (question) {
                  showUpdatePage(question);
                },
              ),
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: () {
          Navigator.push(
            context,
            MaterialPageRoute(
              builder: (context) => AddQuestionPage(),
            ),
          ).then((value) {
            if (value == true) {
              fetchQuestion();
            }
          });
        },
        child: const Icon(Icons.add),
        backgroundColor: Colors.white,
      ),
    );
  }
}
