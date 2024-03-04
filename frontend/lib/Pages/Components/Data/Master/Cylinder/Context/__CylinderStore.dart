import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:flutter_dotenv/flutter_dotenv.dart';
import 'package:http/http.dart' as http;
import 'package:shared_preferences/shared_preferences.dart';

class AddCylinderPage extends StatefulWidget {
  @override
  _AddCylinderPageState createState() => _AddCylinderPageState();
}

class _AddCylinderPageState extends State<AddCylinderPage> {
  final TextEditingController volumeController = TextEditingController();
  late String baseUrl;

  @override
  void initState() {
    super.initState();
    initializeBaseUrl();
  }

  Future<void> initializeBaseUrl() async {
    await dotenv.load();
    baseUrl = dotenv.env['BASE_URL']!;
  }

  Future<String> getTokenFromStorage() async {
    SharedPreferences prefs = await SharedPreferences.getInstance();
    return prefs.getString('token') ?? '';
  }

  Future<void> addCylinder() async {
    try {
      String token = await getTokenFromStorage();

      Map<String, String> headers = {
        'Authorization': 'Bearer $token',
        'Content-Type': 'application/json',
      };

      // Periksa apakah nilai volume adalah angka
      if (volumeController.text.isEmpty ||
          int.tryParse(volumeController.text) == null) {
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(
            content: Text('Please enter a valid volume'),
            duration: Duration(seconds: 2),
          ),
        );
        return;
      }

      Map<String, dynamic> data = {
        'volume': int.parse(volumeController.text),
      };

      final response = await http.post(
        Uri.parse('$baseUrl/api/cylinder/store'),
        headers: headers,
        body: jsonEncode(data),
      );

      if (response.statusCode == 200) {
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(
            content: Text('Cylinder added successfully'),
            duration: Duration(seconds: 2),
          ),
        );
        Navigator.pop(context, true);
      } else {
        print('Failed to add Cylinder: ${response.statusCode}');
      }
    } catch (e) {
      print('Error adding Cylinder: $e');
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Add Cylinder'),
        backgroundColor: Colors.black,
      ),
      body: Padding(
        padding: const EdgeInsets.all(20.0),
        child: SingleChildScrollView(
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: [
              TextFormField(
                controller: volumeController,
                keyboardType: TextInputType
                    .number, // Tambahkan keyboard type untuk membatasi input menjadi angka
                decoration: const InputDecoration(labelText: 'Volume'),
              ),
              const SizedBox(height: 20),
              ElevatedButton(
                onPressed: () {
                  addCylinder();
                },
                child: const Text('Add Cylinder'),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
