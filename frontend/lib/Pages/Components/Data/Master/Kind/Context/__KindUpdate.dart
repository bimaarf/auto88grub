import 'dart:io';

import 'package:file_picker/file_picker.dart';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'package:shared_preferences/shared_preferences.dart';

class UpdateKindPage extends StatefulWidget {
  final String kindId;
  final String name;
  final String? imageUrl;
  final Function() onUpdate;
  final Function() fetchNewData;
  final String baseUrl; // Add baseUrl parameter

  UpdateKindPage({
    required this.kindId,
    required this.name,
    required this.onUpdate,
    required this.fetchNewData,
    required this.baseUrl, // Add baseUrl parameter
    this.imageUrl,
  });

  @override
  _UpdateKindPageState createState() => _UpdateKindPageState();
}

class _UpdateKindPageState extends State<UpdateKindPage> {
  TextEditingController _nameController = TextEditingController();
  String _token = '';
  File? _image;
  late String _imageUrl;
  bool _isLoading = false;

  @override
  void initState() {
    super.initState();
    _nameController.text = widget.name;
    _loadToken();
    _imageUrl = widget.imageUrl ?? '';
  }

  Future<void> _loadToken() async {
    SharedPreferences prefs = await SharedPreferences.getInstance();
    setState(() {
      _token = prefs.getString('token') ?? '';
    });
  }

  Future<void> _updateKind() async {
    setState(() {
      _isLoading =
          true; // Set isLoading menjadi true saat proses pembaruan dimulai
    });

    try {
      String token = 'Bearer $_token';

      // Buat FormData
      var request = http.MultipartRequest(
        'POST',
        Uri.parse('${widget.baseUrl}/api/kind/update/${widget.kindId}'),
      );
      request.headers['Authorization'] = token;
      // Tambahkan nama ke FormData
      request.fields['name'] = _nameController.text;
      // Jika ada gambar yang dipilih, tambahkan ke FormData
      if (_image != null) {
        request.files.add(
          await http.MultipartFile.fromPath(
            'image',
            _image!.path,
            filename: 'image.jpg',
          ),
        );
      }

      // Kirim request
      var response = await request.send();

      // Periksa kode status respons
      if (response.statusCode == 200) {
        // Handle jika berhasil
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(
            content: Text('Kind updated successfully'),
            duration: Duration(seconds: 2),
          ),
        );

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
      print('Error updating kind: $e');
    } finally {
      // Setelah pembaruan selesai, atur kembali isLoading menjadi false
      setState(() {
        _isLoading = false;
      });
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
        _imageUrl =
            ''; // Menghapus imageUrl yang sudah ada karena akan diganti dengan gambar yang baru dipilih
      });

      // Tambahkan pemanggilan _updateKind() untuk mengirim data pembaruan ke server
      // await _updateKind();
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
            if (_imageUrl
                .isNotEmpty) // Display the previously selected image (if any)
              ClipRRect(
                borderRadius: BorderRadius.circular(8),
                child: Image.network(
                  '${widget.baseUrl}/storage/$_imageUrl',
                  width: 200,
                  height: 200,
                  fit: BoxFit.cover,
                ),
              ),
            if (_image != null)
              ClipRRect(
                borderRadius: BorderRadius.circular(8),
                child: Image.file(
                  _image!,
                  width: 200,
                  height: 200,
                  fit: BoxFit.cover,
                ),
              ),
            ElevatedButton(
              onPressed: _isLoading ? null : _pickImage,
              child: const Text('Choose Image'),
            ),
            const SizedBox(height: 20),
            ElevatedButton(
              onPressed: _isLoading ? null : _updateKind,
              child: const Text('Update'),
            ),
          ],
        ),
      ),
    );
  }
}
