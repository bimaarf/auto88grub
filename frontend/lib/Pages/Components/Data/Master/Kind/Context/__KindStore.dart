import 'dart:io';
import 'package:flutter/material.dart';
import 'package:flutter_dotenv/flutter_dotenv.dart';
import 'package:http/http.dart' as http;
import 'package:file_picker/file_picker.dart';
import 'package:shared_preferences/shared_preferences.dart';

class AddKindPage extends StatefulWidget {
  @override
  _AddKindPageState createState() => _AddKindPageState();
}

class _AddKindPageState extends State<AddKindPage> {
  final TextEditingController nameController = TextEditingController();
  late String baseUrl;
  File? _image; // Tipe variabel diubah menjadi File

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

  Future<void> addKind() async {
    try {
      String token = await getTokenFromStorage();

      var request = http.MultipartRequest(
        'POST',
        Uri.parse('$baseUrl/api/kind/store'),
      );

      request.headers['Authorization'] = 'Bearer $token';
      request.fields['name'] = nameController.text;

      if (_image != null) {
        request.files.add(
          await http.MultipartFile.fromPath(
            'image',
            _image!.path,
          ),
        );
      }

      var streamedResponse = await request.send();
      var response = await http.Response.fromStream(streamedResponse);

      if (response.statusCode == 200) {
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(
            content: Text('Kind added successfully'),
            duration: Duration(seconds: 2),
          ),
        );
        Navigator.pop(context, true);
      } else {
        print('Failed to add Kind: ${response.statusCode}');
      }
    } catch (e) {
      print('Error adding Kind: $e');
    }
  }

  Future<void> _pickImage() async {
    FilePickerResult? result = await FilePicker.platform.pickFiles(
      type: FileType.image,
      allowMultiple: false,
    );

    if (result != null) {
      setState(() {
        _image = File(result.files.single.path!);
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Add Kind'),
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
              // Widget untuk menampilkan gambar yang dipilih
              if (_image != null) ...[
                Image.file(_image!),
                const SizedBox(height: 20),
              ],
              const SizedBox(height: 20),
              ElevatedButton(
                onPressed: () {
                  _pickImage(); // Panggil metode untuk memilih gambar
                },
                child: const Text('Choose Image'),
              ),
              const SizedBox(height: 20),
              ElevatedButton(
                onPressed: () {
                  addKind();
                },
                child: const Text('Add Kind'),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
