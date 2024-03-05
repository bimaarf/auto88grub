import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:flutter_dotenv/flutter_dotenv.dart';
import 'package:http/http.dart' as http;
import 'package:shared_preferences/shared_preferences.dart';

class UpdateCylinderPage extends StatefulWidget {
  final String cylinderId;
  final int volume;
  final Function() onUpdate;
  final Function() fetchNewData;

  UpdateCylinderPage({
    required this.cylinderId,
    required this.volume,
    required this.onUpdate,
    required this.fetchNewData,
  });

  @override
  _UpdateCylinderPageState createState() => _UpdateCylinderPageState();
}

class _UpdateCylinderPageState extends State<UpdateCylinderPage> {
  TextEditingController _volumeController = TextEditingController();
  String _token = '';
  bool _isLoading = false;
  @override
  void initState() {
    super.initState();
    _volumeController.text = widget.volume.toString();
    _loadToken();
  }

  Future<void> _loadToken() async {
    SharedPreferences prefs = await SharedPreferences.getInstance();
    setState(() {
      _token = prefs.getString('token') ?? '';
    });
  }

  Future<void> updateCylinder() async {
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

      if (_volumeController.text.isEmpty ||
          int.tryParse(_volumeController.text) == null) {
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(
            content: Text('Please enter a valid volume'),
            duration: Duration(seconds: 2),
          ),
        );
        return;
      }

      Map<String, dynamic> data = {
        'volume': int.parse(_volumeController.text),
      };

      final response = await http.post(
        Uri.parse('$baseUrl/api/cylinder/update/${widget.cylinderId}'),
        headers: headers,
        body: jsonEncode(data),
      );

      if (response.statusCode == 200) {
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(
            content: Text('Cylinder updated successfully'),
            duration: Duration(seconds: 2),
          ),
        );

        widget.onUpdate();
        Navigator.pop(context, true);
      } else {
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(
            content: Text('Failed to update Cylinder'),
            duration: Duration(seconds: 2),
          ),
        );
        print('Failed to update Cylinder: ${response.statusCode}');
      }
    } catch (e) {
      print('Error updating Cylinder: $e');
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
        title: const Text('Update Cylinder'),
        backgroundColor: Colors.black,
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            TextFormField(
              controller: _volumeController,
              keyboardType: TextInputType.number,
              decoration: const InputDecoration(labelText: 'Volume'),
            ),
            const SizedBox(height: 20),
            ElevatedButton(
              onPressed: _isLoading ? null : updateCylinder,
              child: const Text('Update'),
            ),
          ],
        ),
      ),
    );
  }
}
