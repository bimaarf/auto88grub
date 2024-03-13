import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:flutter_dotenv/flutter_dotenv.dart';
import 'package:http/http.dart' as http;
import 'package:shared_preferences/shared_preferences.dart';

class AddGearPage extends StatefulWidget {
  @override
  _AddGearPageState createState() => _AddGearPageState();
}

class _AddGearPageState extends State<AddGearPage> {
  final TextEditingController nameController = TextEditingController();
  late String baseUrl;
  bool _isLoading = false;
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

  Future<void> addGear() async {
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
      };

      final response = await http.post(
        Uri.parse('$baseUrl/api/gear/store'),
        headers: headers,
        body: jsonEncode(data),
      );

      if (response.statusCode == 200) {
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(
            content: Text('Gear added successfully'),
            duration: Duration(seconds: 2),
          ),
        );
        Navigator.pop(context, true); // Pop page with success signal
      } else {
        print('Failed to add Gear: ${response.statusCode}');
      }
    } catch (e) {
      print('Error adding Gear: $e');
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
        title: const Text('Add Gear'),
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
              ElevatedButton(
                onPressed: _isLoading ? null : addGear,
                child: const Text('Tambah Gear'),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
