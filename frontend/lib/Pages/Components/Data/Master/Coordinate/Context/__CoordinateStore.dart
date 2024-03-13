import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:flutter_dotenv/flutter_dotenv.dart';
import 'package:http/http.dart' as http;
import 'package:shared_preferences/shared_preferences.dart';

class AddCoordinatePage extends StatefulWidget {
  @override
  _AddCoordinatePageState createState() => _AddCoordinatePageState();
}

class _AddCoordinatePageState extends State<AddCoordinatePage> {
  final TextEditingController nameController = TextEditingController();
  final TextEditingController latitudeController = TextEditingController();
  final TextEditingController longitudeController = TextEditingController();
  final TextEditingController limitationController = TextEditingController();

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

  Future<void> addCoordinate() async {
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
        'latitude': latitudeController.text,
        'longitude': longitudeController.text,
        'is_unlimited': isUnlimited,
        'limitation': limitationController.text,
        'is_visible': isVisible,
      };

      final response = await http.post(
        Uri.parse('$baseUrl/api/coordinate/store'),
        headers: headers,
        body: jsonEncode(data),
      );

      if (response.statusCode == 200) {
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(
            content: Text('Coordinate added successfully'),
            duration: Duration(seconds: 2),
          ),
        );
        Navigator.pop(context, true); // Pop page with success signal
      } else {
        print('Failed to add coordinate: ${response.statusCode}');
      }
    } catch (e) {
      print('Error adding coordinate: $e');
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
        title: const Text('Add Coordinate'),
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
              const SizedBox(height: 10),
              TextFormField(
                controller: latitudeController,
                decoration: const InputDecoration(labelText: 'Latitude'),
              ),
              const SizedBox(height: 10),
              TextFormField(
                controller: longitudeController,
                decoration: const InputDecoration(labelText: 'Longitude'),
              ),
              const SizedBox(height: 10),
              Row(
                children: [
                  const Text('Is Unlimited:'),
                  Checkbox(
                    value: isUnlimited,
                    onChanged: (value) {
                      setState(() {
                        isUnlimited = value!;
                      });
                    },
                  ),
                ],
              ),
              const SizedBox(height: 10),
              TextFormField(
                controller: limitationController,
                keyboardType: TextInputType.number,
                decoration: const InputDecoration(labelText: 'Limitation'),
              ),
              const SizedBox(height: 10),
              Row(
                children: [
                  const Text('Is Visible:'),
                  Checkbox(
                    value: isVisible,
                    onChanged: (value) {
                      setState(() {
                        isVisible = value!;
                      });
                    },
                  ),
                ],
              ),
              const SizedBox(height: 20),
              ElevatedButton(
                onPressed: _isLoading ? null : addCoordinate,
                child: const Text('Add Coordinate'),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
