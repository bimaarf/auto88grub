import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:flutter_dotenv/flutter_dotenv.dart';
import 'package:frontend/Model/Services/Site/fetchCategoryQuestion.dart';
import 'package:http/http.dart' as http;
import 'package:shared_preferences/shared_preferences.dart';

class UpdateQuestionPage extends StatefulWidget {
  final String questionId;
  final String name;
  final String categoryId;
  final String categoryName;
  final List<Map<String, dynamic>> categories;
  final Function() onUpdate;
  final Function() fetchNewData;

  UpdateQuestionPage({
    required this.questionId,
    required this.name,
    required this.categoryId,
    required this.categoryName,
    required this.categories,
    required this.onUpdate,
    required this.fetchNewData,
  });

  @override
  _UpdateQuestionPageState createState() => _UpdateQuestionPageState();
}

class _UpdateQuestionPageState extends State<UpdateQuestionPage> {
  TextEditingController _nameController = TextEditingController();
  String _token = '';
  List<Map<String, dynamic>> _category = [];
  String _selectedCategoryId = '';
  bool _isLoading = false;
  late String baseUrl;

  @override
  void initState() {
    super.initState();
    _nameController.text = widget.name;
    _selectedCategoryId = widget.categoryId;
    _category = widget.categories;
    _loadToken();
    initializeBaseUrl();
  }

  Future<void> initializeBaseUrl() async {
    await dotenv.load();
    baseUrl = dotenv.env['BASE_URL']!;
    await fetchCategory(); // Await fetchCategory
  }

  Future<void> _loadToken() async {
    SharedPreferences prefs = await SharedPreferences.getInstance();
    setState(() {
      _token = prefs.getString('token') ?? '';
    });
  }

  Future<void> fetchCategory() async {
    try {
      setState(() {
        _isLoading = true;
      });

      _category = await ServiceCategoryQuestion.fetchCategoryQuestion(baseUrl);

      // Check if the selected category ID exists in the fetched categories
      if (!_category.any(
          (category) => category['id'].toString() == _selectedCategoryId)) {
        // If not, set the selected category ID to the first item in the list
        _selectedCategoryId =
            _category.isNotEmpty ? _category.first['id'].toString() : '';
      }
    } catch (e) {
      print('Error fetching category data: $e');
    } finally {
      setState(() {
        _isLoading = false;
      });
    }
  }

  Future<void> updateQuestion() async {
    setState(() {
      _isLoading = true;
    });
    try {
      String baseUrl = dotenv.env['BASE_URL']!;
      String token = 'Bearer $_token';
      Map<String, String> headers = {
        'Authorization': token,
        'Content-Type': 'application/json',
      };

      Map<String, dynamic> data = {
        'category_id': _selectedCategoryId,
        'name': _nameController.text,
      };

      final response = await http.post(
        Uri.parse('$baseUrl/api/question/update/${widget.questionId}'),
        headers: headers,
        body: jsonEncode(data),
      );
      if (response.statusCode == 200) {
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(
            content: Text('Question updated successfully'),
            duration: Duration(seconds: 2),
          ),
        );
        widget.onUpdate();
        Navigator.pop(context, true);
      } else {
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(
            content: Text('Failed to update Question'),
            duration: Duration(seconds: 2),
          ),
        );
        print('Failed to update Question: ${response.statusCode}');
      }
    } catch (e) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(
          content: Text('An error occurred while updating Question'),
          duration: Duration(seconds: 2),
        ),
      );
      print('Error updating Question: $e');
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
        title: const Text('Update Question'),
        backgroundColor: Colors.black,
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            if (_isLoading)
              const Center(child: CircularProgressIndicator())
            else
              DropdownButtonFormField<String>(
                value: _selectedCategoryId,
                onChanged: (String? newValue) {
                  setState(() {
                    if (_category.any(
                        (category) => category['id'].toString() == newValue)) {
                      _selectedCategoryId = newValue!;
                    } else {
                      _selectedCategoryId = '';
                    }
                  });
                },
                items: _category.map<DropdownMenuItem<String>>((category) {
                  return DropdownMenuItem<String>(
                    value: category['id'].toString(),
                    child: Text(category['name']),
                  );
                }).toList(),
                decoration: const InputDecoration(labelText: 'Category'),
              ),
            TextFormField(
              controller: _nameController,
              decoration: const InputDecoration(labelText: 'Name'),
            ),
            const SizedBox(height: 20),
            ElevatedButton(
              onPressed: _isLoading ? null : updateQuestion,
              child: const Text('Update'),
            ),
          ],
        ),
      ),
    );
  }
}
