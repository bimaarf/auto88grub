import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:flutter_dotenv/flutter_dotenv.dart';
import 'package:frontend/Model/Services/MasterData/fetchBrand.dart';
import 'package:http/http.dart' as http;
import 'package:shared_preferences/shared_preferences.dart';

class UpdateTypePage extends StatefulWidget {
  final String typeId;
  final String name;
  final String brandId;
  final String brandName;
  final List<Map<String, dynamic>> brands;
  final Function() onUpdate;
  final Function() fetchNewData;

  UpdateTypePage({
    required this.typeId,
    required this.name,
    required this.brandId,
    required this.brandName,
    required this.brands,
    required this.onUpdate,
    required this.fetchNewData,
  });

  @override
  _UpdateTypePageState createState() => _UpdateTypePageState();
}

class _UpdateTypePageState extends State<UpdateTypePage> {
  TextEditingController _nameController = TextEditingController();
  String _token = '';
  List<Map<String, dynamic>> _brands = [];
  String _selectedBrandId = '';
  bool _isLoading = false;
  late String baseUrl;

  @override
  void initState() {
    super.initState();
    _nameController.text = widget.name;
    _selectedBrandId = widget.brandId;
    _brands = widget.brands;
    _loadToken();
    initializeBaseUrl();
  }

  Future<void> initializeBaseUrl() async {
    await dotenv.load();
    baseUrl = dotenv.env['BASE_URL']!;
    await fetchBrand(); // Await fetchBrand
  }

  Future<void> _loadToken() async {
    SharedPreferences prefs = await SharedPreferences.getInstance();
    setState(() {
      _token = prefs.getString('token') ?? '';
    });
  }

  Future<void> fetchBrand() async {
    try {
      setState(() {
        _isLoading = true;
      });

      _brands = await ServiceBrand.fetchBrands(baseUrl);

      if (!_brands.any((brand) => brand['id'].toString() == _selectedBrandId)) {
        _selectedBrandId =
            _brands.isNotEmpty ? _brands.first['id'].toString() : '';
      }
    } catch (e) {
      print('Error fetching brand data: $e');
    } finally {
      setState(() {
        _isLoading = false;
      });
    }
  }

  Future<void> updateType() async {
    try {
      String baseUrl = dotenv.env['BASE_URL']!;
      String token = 'Bearer $_token';
      Map<String, String> headers = {
        'Authorization': token,
        'Content-Type': 'application/json',
      };

      Map<String, dynamic> data = {
        'car_brand_id': _selectedBrandId,
        'name': _nameController.text,
      };

      final response = await http.post(
        Uri.parse('$baseUrl/api/type/update/${widget.typeId}'),
        headers: headers,
        body: jsonEncode(data),
      );

      if (response.statusCode == 200) {
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(
            content: Text('Type updated successfully'),
            duration: Duration(seconds: 2),
          ),
        );
        widget.onUpdate();
        Navigator.pop(context, true);
      } else {
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(
            content: Text('Failed to update Type'),
            duration: Duration(seconds: 2),
          ),
        );
        print('Failed to update Type: ${response.statusCode}');
      }
    } catch (e) {
      // Catch any errors that occur during the update process
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(
          content: Text('An error occurred while updating Type'),
          duration: Duration(seconds: 2),
        ),
      );
      print('Error updating Type: $e');
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Update Type'),
        backgroundColor: Colors.black,
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            if (_isLoading)
              Center(child: CircularProgressIndicator())
            else
              DropdownButtonFormField<String>(
                value: _selectedBrandId,
                onChanged: (String? newValue) {
                  setState(() {
                    if (_brands
                        .any((brand) => brand['id'].toString() == newValue)) {
                      _selectedBrandId = newValue!;
                    } else {
                      _selectedBrandId = '';
                    }
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
            TextFormField(
              controller: _nameController,
              decoration: const InputDecoration(labelText: 'Name'),
            ),
            const SizedBox(height: 20),
            ElevatedButton(
              onPressed: () {
                updateType();
              },
              child: const Text('Update'),
            ),
          ],
        ),
      ),
    );
  }
}
