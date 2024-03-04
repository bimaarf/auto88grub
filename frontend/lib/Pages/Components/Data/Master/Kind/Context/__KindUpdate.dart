import 'dart:convert';
import 'dart:io';

import 'package:flutter/material.dart';
import 'package:flutter_dotenv/flutter_dotenv.dart';
import 'package:http/http.dart' as http;
import 'package:image_picker/image_picker.dart';
import 'package:shared_preferences/shared_preferences.dart';

class UpdateKindPage extends StatefulWidget {
  final String kindId;
  final String name;
  final Function() onUpdate;
  final Function() fetchNewData;

  UpdateKindPage({
    required this.kindId,
    required this.name,
    required this.onUpdate,
    required this.fetchNewData,
  });

  @override
  _UpdateKindPageState createState() => _UpdateKindPageState();
}

class _UpdateKindPageState extends State<UpdateKindPage> {
  TextEditingController _nameController = TextEditingController();
  String _token = '';
  File? _image;

  @override
  void initState() {
    super.initState();
    _nameController.text = widget.name;
    _loadToken();
  }

  Future<void> _loadToken() async {
    SharedPreferences prefs = await SharedPreferences.getInstance();
    setState(() {
      _token = prefs.getString('token') ?? '';
    });
  }

  Future<void> _pickImage() async {
    final pickedFile =
        await ImagePicker().pickImage(source: ImageSource.gallery);
    if (pickedFile != null) {
      setState(() {
        _image = File(pickedFile.path);
      });
    }
  }

  Future<void> updateKind() async {
    try {
      String baseUrl = dotenv.env['BASE_URL']!;
      String token = 'Bearer $_token';

      Map<String, String> headers = {
        'Authorization': 'Bearer $token',
        'Content-Type': 'application/json',
      };

      Map<String, dynamic> data = {
        'name': _nameController.text,
      };

      if (_image != null) {
        // Jika gambar dipilih, tambahkan gambar ke permintaan
        String base64Image = base64Encode(_image!.readAsBytesSync());
        data['image'] = base64Image;
      }

      final response = await http.post(
        Uri.parse('$baseUrl/api/kind/update/${widget.kindId}'),
        headers: headers,
        body: jsonEncode(data),
      );

      if (response.statusCode == 200) {
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(
            content: Text('Kind updated successfully'),
            duration: Duration(seconds: 2),
          ),
        );

        // Panggil fungsi untuk mengambil data baru
        widget.onUpdate();
        Navigator.pop(context, true);
      } else {
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(
            content: Text('Failed to update kind'),
            duration: Duration(seconds: 2),
          ),
        );
        print('Failed to update kind: ${response.statusCode}');
      }
    } catch (e) {
      // Tangani kesalahan saat memperbarui jenis
      print('Error updating kind: $e');
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Update kind'),
        backgroundColor: Colors.black,
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            TextFormField(
              controller: _nameController,
              decoration: const InputDecoration(labelText: 'Name'),
            ),
            const SizedBox(height: 20),
            ElevatedButton(
              onPressed: () {
                updateKind();
              },
              child: const Text('Update'),
            ),
            const SizedBox(height: 20),
            ElevatedButton(
              onPressed: () {
                _pickImage();
              },
              child: const Text('Pick Image'),
            ),
          ],
        ),
      ),
    );
  }
}
