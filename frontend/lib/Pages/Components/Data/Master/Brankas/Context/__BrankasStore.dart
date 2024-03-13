import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:flutter_dotenv/flutter_dotenv.dart';
import 'package:http/http.dart' as http;
import 'package:shared_preferences/shared_preferences.dart';

class AddBrankasPage extends StatefulWidget {
  @override
  _AddBrankasPageState createState() => _AddBrankasPageState();
}

class _AddBrankasPageState extends State<AddBrankasPage> {
  final TextEditingController nameController = TextEditingController();

  bool isUnlimited = false;
  bool isVisible = true;
  bool _isLoading = false;
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

  Future<void> addBrankas() async {
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
        Uri.parse('$baseUrl/api/brankas/store'),
        headers: headers,
        body: jsonEncode(data),
      );

      if (response.statusCode == 200) {
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(
            content: Text('Brankas added successfully'),
            duration: Duration(seconds: 2),
          ),
        );
        Navigator.pop(context, true); // Pop page with success signal
      } else {
        print('Failed to add Brankas: ${response.statusCode}');
      }
    } catch (e) {
      print('Error adding Brankas: $e');
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
        title: const Text('Tambah Brankas'),
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
                onPressed: _isLoading ? null : addBrankas,
                child: const Text('Add Brankas'),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
