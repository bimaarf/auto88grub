import 'dart:io'; // Tambahkan ini untuk menggunakan File
import 'package:flutter/material.dart';
import 'package:flutter_dotenv/flutter_dotenv.dart';
import 'package:http/http.dart' as http;
import 'package:image_picker/image_picker.dart'; // Perbaiki import untuk menggunakan ImagePicker
import 'package:shared_preferences/shared_preferences.dart';

class AddKindPage extends StatefulWidget {
  @override
  _AddKindPageState createState() => _AddKindPageState();
}

class _AddKindPageState extends State<AddKindPage> {
  final TextEditingController nameController = TextEditingController();
  late String baseUrl;
  File? _image; // Ubah tipe variabel menjadi File

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

      // Hapus variabel headers karena tidak digunakan
      // Map<String, String> headers = {
      //   'Authorization': 'Bearer $token',
      //   'Content-Type': 'application/json',
      // };

      Map<String, dynamic> data = {
        'name': nameController.text,
      };

      // Membuat request multipart untuk mengirim gambar bersamaan dengan data
      var request = http.MultipartRequest(
        'POST',
        Uri.parse('$baseUrl/api/kind/store'),
      );

      // Menambahkan token ke header
      request.headers['Authorization'] = 'Bearer $token';

      // Menambahkan data teks ke dalam request
      request.fields['name'] = nameController.text;

      // Menambahkan gambar ke dalam request jika ada
      if (_image != null) {
        request.files.add(
          http.MultipartFile(
            'image',
            _image!.readAsBytes().asStream(),
            _image!.lengthSync(),
            filename: _image!.path.split('/').last,
          ),
        );
      }

      // Mengirim request
      var streamedResponse = await request.send();
      var response = await http.Response.fromStream(streamedResponse);

      if (response.statusCode == 200) {
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(
            content: Text('Kind added successfully'),
            duration: Duration(seconds: 2),
          ),
        );
        Navigator.pop(context, true); // Pop page with success signal
      } else {
        print('Failed to add Kind: ${response.statusCode}');
      }
    } catch (e) {
      print('Error adding Kind: $e');
    }
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
              // Tombol untuk memilih gambar dari galeri
              ElevatedButton(
                onPressed: () {
                  _pickImage(); // Ubah pemanggilan metode sesuai dengan yang benar
                },
                child: const Text('Choose Image'),
              ),
              // Widget untuk menampilkan gambar yang dipilih
              if (_image != null) ...[
                Image.file(_image!),
                const SizedBox(height: 20),
              ],
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
