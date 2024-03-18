import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:flutter_dotenv/flutter_dotenv.dart';
import 'package:http/http.dart' as http;
import 'package:shared_preferences/shared_preferences.dart';

class UpdateVacancyPage extends StatefulWidget {
  final String vacancyId;
  final String name;
  final String department;
  final String experience;
  final String placement;
  final String description;
  final String condition;
  final Function() onUpdate;
  final Function() fetchNewData;

  UpdateVacancyPage({
    required this.vacancyId,
    required this.name,
    required this.department,
    required this.experience,
    required this.placement,
    required this.description,
    required this.condition,
    required this.onUpdate,
    required this.fetchNewData,
  });

  @override
  _UpdateVacancyPageState createState() => _UpdateVacancyPageState();
}

class _UpdateVacancyPageState extends State<UpdateVacancyPage> {
  TextEditingController _nameController = TextEditingController();
  TextEditingController _departmentController = TextEditingController();
  TextEditingController _experienceController = TextEditingController();
  TextEditingController _placementController = TextEditingController();
  TextEditingController _descriptionController = TextEditingController();
  TextEditingController _conditionController = TextEditingController();
  String _token = '';
  bool _isLoading = false;

  @override
  void initState() {
    super.initState();
    _nameController.text = widget.name;
    _departmentController.text = widget.department;
    _experienceController.text = widget.experience;
    _placementController.text = widget.placement;
    _descriptionController.text = widget.description;
    _conditionController.text = widget.condition;
    _loadToken();
  }

  Future<void> _loadToken() async {
    SharedPreferences prefs = await SharedPreferences.getInstance();
    setState(() {
      _token = prefs.getString('token') ?? '';
    });
  }

  Future<void> updateVacancy() async {
    setState(() {
      _isLoading = true;
    });
    try {
      String baseUrl = dotenv.env['BASE_URL']!;
      String token = 'Bearer $_token';

      Map<String, String> headers = {
        'Authorization': 'Bearer $token',
        'Content-Type': 'application/json',
      };

      Map<String, dynamic> data = {
        'name': _nameController.text,
        'department': _departmentController.text,
        'experience': _experienceController.text,
        'placement': _placementController.text,
        'description': _descriptionController.text,
        'condition': _conditionController.text,
      };

      final response = await http.post(
        Uri.parse('$baseUrl/api/vacancy/update/${widget.vacancyId}'),
        headers: headers,
        body: jsonEncode(data),
      );

      if (response.statusCode == 200) {
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(
            content: Text('Vacancy updated successfully'),
            duration: Duration(seconds: 2),
          ),
        );
        widget.onUpdate();
        Navigator.pop(context, true);
      } else {
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(
            content: Text('Failed to update vacancy'),
            duration: Duration(seconds: 2),
          ),
        );
        print('Failed to update vacancy: ${response.statusCode}');
      }
    } catch (e) {
      print('Error updating vacancy: $e');
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
        title: const Text('Update Vacancy'),
        backgroundColor: Colors.black,
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            TextFormField(
              controller: _nameController,
              decoration: const InputDecoration(
                labelText: 'Name',
              ),
            ),
            TextFormField(
              controller: _departmentController,
              decoration: const InputDecoration(
                labelText: 'Department',
              ),
            ),
            TextFormField(
              controller: _experienceController,
              decoration: const InputDecoration(
                labelText: 'Experience',
              ),
            ),
            TextFormField(
              controller: _placementController,
              decoration: const InputDecoration(
                labelText: 'Placement',
              ),
            ),
            Row(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Expanded(
                  child: TextField(
                    controller: _descriptionController,
                    maxLines: 4, // Set max lines for multiple lines of text
                    decoration: const InputDecoration(
                      labelText: 'Description',
                    ),
                  ),
                ),
                IconButton(
                  onPressed: () {
                    // Your logic when suffix icon is pressed
                  },
                  icon: const Icon(Icons.attach_file_rounded),
                ),
              ],
            ),
            TextFormField(
              controller: _conditionController,
              decoration: const InputDecoration(
                labelText: 'Condition',
              ),
            ),
            const SizedBox(height: 20),
            ElevatedButton(
              onPressed: _isLoading ? null : updateVacancy,
              child: const Text('Update'),
            ),
          ],
        ),
      ),
    );
  }
}
