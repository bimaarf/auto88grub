import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:flutter_dotenv/flutter_dotenv.dart';
import 'package:frontend/Model/Services/MasterData/fetchBrand.dart';
import 'package:frontend/Model/Services/MasterData/fetchModel.dart';
import 'package:http/http.dart' as http;
import 'package:shared_preferences/shared_preferences.dart';

class AddTypePage extends StatefulWidget {
  @override
  _AddTypePageState createState() => _AddTypePageState();
}

class _AddTypePageState extends State<AddTypePage> {
  final TextEditingController nameController = TextEditingController();
  String _selectedBrandId = '';
  String _selectedModelId = '';

  late String baseUrl;
  List<Map<String, dynamic>> _brands = [];
  List<Map<String, dynamic>> _models = [];
  bool _isLoading = false;

  @override
  void initState() {
    super.initState();
    initializeBaseUrl();
  }

  Future<void> initializeBaseUrl() async {
    await dotenv.load();
    baseUrl = dotenv.env['BASE_URL']!;
    await fetchBrand();
    await fetchModel();
  }

  Future<String> getTokenFromStorage() async {
    SharedPreferences prefs = await SharedPreferences.getInstance();
    return prefs.getString('token') ?? '';
  }

  Future<void> fetchBrand() async {
    setState(() {
      _isLoading = true;
    });
    try {
      _brands = await ServiceBrand.fetchBrands(baseUrl);

      if (_brands.isNotEmpty) {
        setState(() {
          _selectedBrandId = _brands.first['id'].toString();
        });
      }
    } catch (e) {
      print('Error fetching brand data: $e');
    } finally {
      setState(() {
        _isLoading = false;
      });
    }
  }

  Future<void> fetchModel() async {
    setState(() {
      _isLoading = true;
    });
    try {
      _models = await ServiceModel.fetchModel(baseUrl);

      if (_models.isNotEmpty) {
        setState(() {
          _selectedModelId = _models.first['id'].toString();
        });
      }
    } catch (e) {
      print('Error fetching model data: $e');
    } finally {
      setState(() {
        _isLoading = false;
      });
    }
  }

  Future<void> addType() async {
    try {
      String token = await getTokenFromStorage();

      Map<String, String> headers = {
        'Authorization': 'Bearer $token',
        'Content-Type': 'application/json',
      };

      Map<String, dynamic> data = {
        'name': nameController.text,
        'car_brand_id': _selectedBrandId,
        'car_model_id': _selectedModelId,
      };

      final response = await http.post(
        Uri.parse('$baseUrl/api/type/store'),
        headers: headers,
        body: jsonEncode(data),
      );

      if (response.statusCode == 200) {
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(
            content: Text('Type added successfully'),
            duration: Duration(seconds: 2),
          ),
        );
        Navigator.pop(context, true); // Pop page with success signal
      } else {
        print('Failed to add Type: ${response.statusCode}');
      }
    } catch (e) {
      print('Error adding Type: $e');
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Add Type'),
        backgroundColor: Colors.black,
      ),
      body: _isLoading
          ? const Center(
              child: CircularProgressIndicator(),
            )
          : Padding(
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
                    DropdownButtonFormField<String>(
                      value: _selectedModelId,
                      onChanged: (String? newValue) {
                        setState(() {
                          _selectedModelId = newValue!;
                        });
                      },
                      items: _models.map<DropdownMenuItem<String>>((model) {
                        return DropdownMenuItem<String>(
                          value: model['id'].toString(),
                          child: Text(model['name']),
                        );
                      }).toList(),
                      decoration: const InputDecoration(labelText: 'Model'),
                    ),
                    const SizedBox(height: 20),
                    TextFormField(
                      controller: nameController,
                      decoration: const InputDecoration(labelText: 'Name'),
                    ),
                    const SizedBox(height: 20),
                    ElevatedButton(
                      onPressed: () {
                        addType();
                      },
                      child: const Text('Add Type'),
                    ),
                  ],
                ),
              ),
            ),
    );
  }
}
