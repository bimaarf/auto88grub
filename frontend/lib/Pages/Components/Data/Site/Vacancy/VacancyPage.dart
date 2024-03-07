import 'package:flutter/material.dart';
import 'package:flutter_dotenv/flutter_dotenv.dart';
import 'package:frontend/Model/Services/Site/fetchVacancy.dart';
import 'package:frontend/Pages/Components/Data/Site/Vacancy/Context/__VacancyList.dart';
import 'package:frontend/Pages/Components/Data/Site/Vacancy/Context/__VacancyStore.dart';
import 'package:frontend/Pages/Components/Data/Site/Vacancy/Context/__VacancyUpdate.dart';
import 'package:shared_preferences/shared_preferences.dart';

class VacancyPage extends StatefulWidget {
  @override
  _VacancyPageState createState() => _VacancyPageState();
}

class _VacancyPageState extends State<VacancyPage> {
  List<Map<String, dynamic>> vacancies = [];
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
    await fetchVacancy();
  }

  Future<String> getTokenFromStorage() async {
    SharedPreferences prefs = await SharedPreferences.getInstance();
    return prefs.getString('token') ?? '';
  }

  Future<void> fetchVacancy() async {
    try {
      setState(() {
        isLoading = true;
      });

      vacancies = await ServiceVacancy.fetchVacancy(baseUrl);

      setState(() {
        isLoading = false;
      });
    } catch (e) {
      print('Error fetching vacancy data: $e');
      setState(() {
        isLoading = false;
      });
    }
  }

  void showUpdatePage(Map<String, dynamic> vacancy) {
    Navigator.push(
      context,
      MaterialPageRoute(
        builder: (context) => UpdateVacancyPage(
          vacancyId: vacancy['id']?.toString() ?? '',
          name: vacancy['name'] ?? '',
          department: vacancy['department'] ?? '',
          experience: vacancy['experience'] ?? '',
          placement: vacancy['placement'] ?? '',
          description: vacancy['description'] ?? '',
          condition: vacancy['condition'] ?? '',
          onUpdate: () {
            fetchVacancy();
          },
          fetchNewData: fetchVacancy,
        ),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Vacancies'),
        backgroundColor: Colors.black,
      ),
      body: RefreshIndicator(
        color: Colors.white,
        onRefresh: fetchVacancy,
        child: isLoading
            ? const Center(
                child: CircularProgressIndicator(
                  color: Colors.white,
                ),
              )
            : VacancyList(
                vacancies: vacancies,
                onUpdate: (vacancy) {
                  showUpdatePage(vacancy);
                },
              ),
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: () {
          Navigator.push(
            context,
            MaterialPageRoute(
              builder: (context) => AddVacancyPage(),
            ),
          ).then((value) {
            if (value == true) {
              fetchVacancy();
            }
          });
        },
        child: const Icon(Icons.add),
        backgroundColor: Colors.white,
      ),
    );
  }
}
