import 'dart:io';
import 'package:flutter/material.dart';
import 'package:flutter_dotenv/flutter_dotenv.dart';
import 'package:http/http.dart' as http;
import 'package:file_picker/file_picker.dart';
import 'package:permission_handler/permission_handler.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:frontend/Model/Services/Site/fetchCategorySlider.dart'; // Pastikan untuk mengimpor file yang benar

class AddSliderPage extends StatefulWidget {
  @override
  _AddSliderPageState createState() => _AddSliderPageState();
}

class _AddSliderPageState extends State<AddSliderPage> {
  final TextEditingController categoryController = TextEditingController();
  late String baseUrl;
  File? _image;
  String _selectedCategoryName = '';
  bool _isLoading = false;
  List<Map<String, dynamic>> _category = [];

  @override
  void initState() {
    super.initState();
    initializeBaseUrl();
  }

  Future<void> initializeBaseUrl() async {
    await dotenv.load();
    baseUrl = dotenv.env['BASE_URL']!;
    await fetchCategory();
  }

  Future<String> getTokenFromStorage() async {
    SharedPreferences prefs = await SharedPreferences.getInstance();
    return prefs.getString('token') ?? '';
  }

  Future<void> fetchCategory() async {
    try {
      _category = await ServiceCategorySlider.fetchCategorySlider(baseUrl);

      if (_category.isNotEmpty) {
        setState(() {
          _selectedCategoryName = _category.first['category'].toString();
        });
      }
    } catch (e) {
      print('Error fetching category data: $e');
    }
  }

  Future<void> addSlider() async {
    setState(() {
      _isLoading = true;
    });
    try {
      String token = await getTokenFromStorage();

      var request = http.MultipartRequest(
        'POST',
        Uri.parse('$baseUrl/api/slider/store'),
      );

      request.headers['Authorization'] = 'Bearer $token';
      request.fields['category'] = categoryController.text;

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
            content: Text('Slider added successfully'),
            duration: Duration(seconds: 2),
          ),
        );
        Navigator.pop(context, true);
      } else {
        print('Failed to add Slider: ${response.statusCode}');
      }
    } catch (e) {
      print('Error adding Slider: $e');
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
      });
    }
  }

  Future<void> requestStoragePermission() async {
    final status = await Permission.storage.request();
    if (status.isGranted) {
      // Permission Granted, pick image
      _pickImage();
    } else if (status.isDenied ||
        status.isRestricted ||
        status.isPermanentlyDenied) {
      // Permission Denied, show permission settings dialog
      showDialog(
        context: context,
        builder: (BuildContext context) {
          return AlertDialog(
            title: Text('Storage Permission Required'),
            content: Text('Please grant storage permission to pick an image.'),
            actions: <Widget>[
              TextButton(
                onPressed: () {
                  openAppSettings(); // Open app settings to allow permission
                  Navigator.of(context).pop();
                },
                child: Text('Open Settings'),
              ),
              TextButton(
                onPressed: () => Navigator.of(context).pop(),
                child: Text('Cancel'),
              ),
            ],
          );
        },
      );
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Add Slider'),
        backgroundColor: Colors.black,
      ),
      body: Padding(
        padding: const EdgeInsets.all(20.0),
        child: SingleChildScrollView(
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: [
              DropdownButtonFormField<String>(
                value: _selectedCategoryName,
                onChanged: (String? newValue) {
                  setState(() {
                    _selectedCategoryName = newValue!;
                  });
                },
                items: _category.map<DropdownMenuItem<String>>((category) {
                  return DropdownMenuItem<String>(
                    value: category['category'].toString(),
                    child: Text(category['category']),
                  );
                }).toList(),
                decoration: const InputDecoration(labelText: 'Category'),
              ),
              const SizedBox(height: 20),
              if (_image != null) ...[
                Image.file(_image!),
                const SizedBox(height: 20),
              ],
              const SizedBox(height: 20),
              ElevatedButton(
                onPressed: _isLoading ? null : () => requestStoragePermission(),
                child: const Text('Choose Image'),
              ),
              const SizedBox(height: 20),
              ElevatedButton(
                onPressed: _isLoading ? null : addSlider,
                child: const Text('Add Slider'),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
