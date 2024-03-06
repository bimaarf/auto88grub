import 'dart:io';

import 'package:file_picker/file_picker.dart';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'package:shared_preferences/shared_preferences.dart';

class UpdateSliderPage extends StatefulWidget {
  final String sliderId;
  final String category;
  final String? imageUrl;
  final Function() onUpdate;
  final Function() fetchNewData;
  final String baseUrl;

  UpdateSliderPage({
    required this.sliderId,
    required this.category,
    required this.onUpdate,
    required this.fetchNewData,
    required this.baseUrl,
    this.imageUrl,
  });

  @override
  _UpdateSliderPageState createState() => _UpdateSliderPageState();
}

class _UpdateSliderPageState extends State<UpdateSliderPage> {
  TextEditingController _categoryController = TextEditingController();
  String _token = '';
  File? _image;
  late String _imageUrl;
  bool _isLoading = false;

  @override
  void initState() {
    super.initState();
    _categoryController.text = widget.category;
    _loadToken();
    _imageUrl = widget.imageUrl ?? '';
  }

  Future<void> _loadToken() async {
    SharedPreferences prefs = await SharedPreferences.getInstance();
    setState(() {
      _token = prefs.getString('token') ?? '';
    });
  }

  Future<void> Slider() async {
    setState(() {
      _isLoading = true;
    });

    try {
      String token = 'Bearer $_token';

      var request = http.MultipartRequest(
        'POST',
        Uri.parse('${widget.baseUrl}/api/slider/update/${widget.sliderId}'),
      );
      request.headers['Authorization'] = token;
      request.fields['category'] = _categoryController.text;
      if (_image != null) {
        request.files.add(
          await http.MultipartFile.fromPath(
            'image',
            _image!.path,
            filename: 'image.jpg',
          ),
        );
      }
      var response = await request.send();
      if (response.statusCode == 200) {
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(
            content: Text('Slider updated successfully'),
            duration: Duration(seconds: 2),
          ),
        );

        widget.onUpdate();
        Navigator.pop(context, true);
      } else {
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(
            content: Text('Failed to update Slider'),
            duration: Duration(seconds: 2),
          ),
        );
        print('Failed to update Slider: ${response.statusCode}');
      }
    } catch (e) {
      print('Error updating Slider: $e');
    } finally {
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
        _imageUrl = '';
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Update Slider'),
        backgroundColor: Colors.black,
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            TextFormField(
              controller: _categoryController,
              decoration: const InputDecoration(labelText: 'category'),
            ),
            const SizedBox(height: 20),
            if (_imageUrl.isNotEmpty)
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
              onPressed: _isLoading ? null : Slider,
              child: const Text('Update'),
            ),
          ],
        ),
      ),
    );
  }
}
