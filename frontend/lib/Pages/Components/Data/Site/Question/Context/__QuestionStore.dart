import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:flutter_dotenv/flutter_dotenv.dart';
import 'package:frontend/Model/Services/Site/fetchCategoryQuestion.dart';
import 'package:http/http.dart' as http;
import 'package:shared_preferences/shared_preferences.dart';

class AddQuestionPage extends StatefulWidget {
  @override
  _AddQuestionPageState createState() => _AddQuestionPageState();
}

class _AddQuestionPageState extends State<AddQuestionPage> {
  final TextEditingController nameController = TextEditingController();
  String _selectedCategoryId = '';
  bool _isLoading = false;
  late String baseUrl;
  List<Map<String, dynamic>> _categories = [];

  @override
  void initState() {
    super.initState();
    initializeBaseUrl();
  }

  Future<void> initializeBaseUrl() async {
    await dotenv.load();
    baseUrl = dotenv.env['BASE_URL']!;
    await fetchCategoryQuestion();
  }

  Future<String> getTokenFromStorage() async {
    SharedPreferences prefs = await SharedPreferences.getInstance();
    return prefs.getString('token') ?? '';
  }

  Future<void> fetchCategoryQuestion() async {
    try {
      _categories =
          await ServiceCategoryQuestion.fetchCategoryQuestion(baseUrl);

      if (_categories.isNotEmpty) {
        setState(() {
          _selectedCategoryId = _categories.first['id'].toString();
        });
      }
    } catch (e) {
      print('Error fetching category data: $e');
    }
  }

  Future<void> addQuestion() async {
    setState(() {
      _isLoading = true;
    });
    try {
      String token = await getTokenFromStorage();

      Map<String, String> headers = {
        'Authorization': 'Bearer $token',
        'Content-Type': 'application/json',
      };

      Map<String, dynamic> data = {
        'name': nameController.text,
        'category_id': _selectedCategoryId,
      };

      final response = await http.post(
        Uri.parse('$baseUrl/api/question/store'),
        headers: headers,
        body: jsonEncode(data),
      );
      print(data);
      if (response.statusCode == 200) {
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(
            content: Text('Question added successfully'),
            duration: Duration(seconds: 2),
          ),
        );
        Navigator.pop(context, true); // Pop page with success signal
      } else {
        print('Failed to add Question: ${response.statusCode}');
      }
    } catch (e) {
      print('Error adding Question: $e');
    } finally {
      setState(() {
        _isLoading = false;
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Add Question'),
        backgroundColor: Colors.black,
      ),
      body: Padding(
        padding: const EdgeInsets.all(20.0),
        child: SingleChildScrollView(
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: [
              DropdownButtonFormField<String>(
                value: _selectedCategoryId,
                onChanged: (String? newValue) {
                  setState(() {
                    _selectedCategoryId = newValue!;
                  });
                },
                items: _categories.map<DropdownMenuItem<String>>((category) {
                  return DropdownMenuItem<String>(
                    value: category['id'].toString(),
                    child: Text(category['name']),
                  );
                }).toList(),
                decoration: const InputDecoration(labelText: 'Category'),
              ),
              const SizedBox(height: 20),
              TextFormField(
                controller: nameController,
                decoration: const InputDecoration(labelText: 'Name'),
              ),
              const SizedBox(height: 20),
              ElevatedButton(
                onPressed: _isLoading ? null : addQuestion,
                child: const Text('Add Question'),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
