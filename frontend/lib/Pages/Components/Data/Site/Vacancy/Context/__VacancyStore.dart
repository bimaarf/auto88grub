import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'package:shared_preferences/shared_preferences.dart';
import 'package:flutter_dotenv/flutter_dotenv.dart';

class AddVacancyPage extends StatefulWidget {
  @override
  _AddVacancyPageState createState() => _AddVacancyPageState();
}

class _AddVacancyPageState extends State<AddVacancyPage> {
  final TextEditingController nameController = TextEditingController();
  final TextEditingController departmentController = TextEditingController();
  final TextEditingController experienceController = TextEditingController();
  final TextEditingController placementController = TextEditingController();
  final TextEditingController descriptionController = TextEditingController();
  final TextEditingController conditionController = TextEditingController();
  late String baseUrl;
  bool _isLoading = false;

  late ScrollController scrollController;

  @override
  void initState() {
    super.initState();
    initializeBaseUrl();
    scrollController = ScrollController();
  }

  @override
  void dispose() {
    scrollController.dispose();
    super.dispose();
  }

  Future<void> initializeBaseUrl() async {
    await dotenv.load();
    baseUrl = dotenv.env['BASE_URL']!;
  }

  Future<String> getTokenFromStorage() async {
    SharedPreferences prefs = await SharedPreferences.getInstance();
    return prefs.getString('token') ?? '';
  }

  Future<void> addVacancy() async {
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
        'department': departmentController.text,
        'experience': experienceController.text,
        'placement': placementController.text,
        'description': descriptionController.text,
        'condition': conditionController.text,
      };

      final response = await http.post(
        Uri.parse('$baseUrl/api/vacancy/store'),
        headers: headers,
        body: jsonEncode(data),
      );

      if (response.statusCode == 200) {
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(
            content: Text('Vacancy added successfully'),
            duration: Duration(seconds: 2),
          ),
        );
        Navigator.pop(context, true);
      } else {
        print('Failed to add Vacancy: ${response.statusCode}');
      }
    } catch (e) {
      print('Error adding Vacancy: $e');
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
        title: const Text('Add Vacancy'),
        backgroundColor: Colors.black,
      ),
      body: Padding(
        padding: const EdgeInsets.all(20.0),
        child: SingleChildScrollView(
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: [
              TextFormField(
                controller: nameController,
                decoration: const InputDecoration(labelText: 'Name'),
              ),
              const SizedBox(height: 20),
              TextFormField(
                controller: departmentController,
                decoration: const InputDecoration(labelText: 'Department'),
              ),
              const SizedBox(height: 20),
              TextFormField(
                controller: experienceController,
                decoration: const InputDecoration(labelText: 'Experience'),
              ),
              const SizedBox(height: 20),
              TextFormField(
                controller: placementController,
                decoration: const InputDecoration(labelText: 'Placement'),
              ),
              const SizedBox(height: 20),
              TextFormField(
                controller: descriptionController,
                decoration: const InputDecoration(labelText: 'Description'),
              ),
              const SizedBox(height: 20),
              TextFormField(
                controller: conditionController,
                decoration: const InputDecoration(labelText: 'Condition'),
              ),
              const SizedBox(height: 20),
              ElevatedButton(
                onPressed: _isLoading ? null : addVacancy,
                child: const Text('Submit'),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
