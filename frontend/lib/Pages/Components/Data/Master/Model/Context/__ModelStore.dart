import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:flutter_dotenv/flutter_dotenv.dart';
import 'package:frontend/Model/Services/MasterData/fetchBrand.dart';
import 'package:http/http.dart' as http;
import 'package:shared_preferences/shared_preferences.dart';

class AddModelPage extends StatefulWidget {
  @override
  _AddModelPageState createState() => _AddModelPageState();
}

class _AddModelPageState extends State<AddModelPage> {
  final TextEditingController nameController = TextEditingController();
  String _selectedBrandId = '';
  bool _isLoading = false;
  late String baseUrl;
  List<Map<String, dynamic>> _brands = [];

  @override
  void initState() {
    super.initState();
    initializeBaseUrl();
  }

  Future<void> initializeBaseUrl() async {
    await dotenv.load();
    baseUrl = dotenv.env['BASE_URL']!;
    await fetchBrand();
  }

  Future<String> getTokenFromStorage() async {
    SharedPreferences prefs = await SharedPreferences.getInstance();
    return prefs.getString('token') ?? '';
  }

  Future<void> fetchBrand() async {
    try {
      _brands = await ServiceBrand.fetchBrands(baseUrl);

      if (_brands.isNotEmpty) {
        setState(() {
          _selectedBrandId = _brands.first['id'].toString();
        });
      }
    } catch (e) {
      print('Error fetching brand data: $e');
    }
  }

  Future<void> addModel() async {
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
        'car_brand_id': _selectedBrandId,
      };

      final response = await http.post(
        Uri.parse('$baseUrl/api/model/store'),
        headers: headers,
        body: jsonEncode(data),
      );

      if (response.statusCode == 200) {
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(
            content: Text('Model added successfully'),
            duration: Duration(seconds: 2),
          ),
        );
        Navigator.pop(context, true); // Pop page with success signal
      } else {
        print('Failed to add Model: ${response.statusCode}');
      }
    } catch (e) {
      print('Error adding Model: $e');
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
        title: const Text('Add Model'),
        backgroundColor: Colors.black,
      ),
      body: Padding(
        padding: const EdgeInsets.all(20.0),
        child: SingleChildScrollView(
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: [
              DropdownButtonFormField<String>(
                value: _selectedBrandId,
                onChanged: (String? newValue) {
                  setState(() {
                    _selectedBrandId = newValue!;
                  });
                },
                items: _brands.map<DropdownMenuItem<String>>((brand) {
                  return DropdownMenuItem<String>(
                    value: brand['id'].toString(),
                    child: Text(brand['name']),
                  );
                }).toList(),
                decoration: const InputDecoration(labelText: 'Brand'),
              ),
              const SizedBox(height: 20),
              TextFormField(
                controller: nameController,
                decoration: const InputDecoration(labelText: 'Name'),
              ),
              const SizedBox(height: 20),
              ElevatedButton(
                onPressed: _isLoading ? null : addModel,
                child: const Text('Add Model'),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
