import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'package:flutter_dotenv/flutter_dotenv.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:getwidget/getwidget.dart';

class UpdateCarPage extends StatefulWidget {
  final String carId;
  final String imageUrl;
  final String title;
  final String slug;
  final String price;
  final String note;
  final String description;
  final String police_number;

  const UpdateCarPage({
    Key? key,
    required this.carId,
    required this.imageUrl,
    required this.title,
    required this.slug,
    required this.price,
    required this.note,
    required this.description,
    required this.police_number,
  }) : super(key: key);

  @override
  _UpdateCarPageState createState() => _UpdateCarPageState();
}

class _UpdateCarPageState extends State<UpdateCarPage> {
  late TextEditingController _titleController;
  late TextEditingController _descriptionController;
  late TextEditingController _priceController;
  String _token = '';

  @override
  void initState() {
    _titleController = TextEditingController(text: widget.title);
    _descriptionController = TextEditingController(text: widget.description);
    String cleanedPrice = widget.price.replaceAll(RegExp(r'[^0-9]'), '');
    _priceController = TextEditingController(text: cleanedPrice);
    _loadToken();
    super.initState();
  }

  @override
  void dispose() {
    _titleController.dispose();
    _descriptionController.dispose();
    _priceController.dispose();
    super.dispose();
  }

  Future<void> _loadToken() async {
    SharedPreferences prefs = await SharedPreferences.getInstance();
    setState(() {
      _token = prefs.getString('token') ?? '';
    });
  }

  Future<void> _updateCar() async {
    String newTitle = _titleController.text;
    String newDescription = _descriptionController.text;
    String newPrice = _priceController.text;
    String cleanedPrice = newPrice.replaceAll(RegExp(r'[^0-9]'), '');
    String parsedPrice = int.tryParse(cleanedPrice)?.toString() ?? '0';
    String baseUrl = dotenv.env['BASE_URL']!;
    String token = 'Bearer $_token';

    Map<String, String> headers = {
      'Authorization': 'Bearer $token',
      'Content-Type': 'application/json',
    };

    Map<String, dynamic> body = {
      'title': newTitle,
      'price': parsedPrice,
      'description': newDescription,
    };

    try {
      final response = await http.put(
        // Changed http.post to http.put
        Uri.parse(
            '$baseUrl/api/car/update/${widget.carId}'), // Changed Uri.parse to put the carId in the URL
        headers: headers,
        body: json.encode(body),
      );
      if (response.statusCode == 200) {
        Navigator.pop(context);
        GFToast.showToast(
          'Car successfully updated!',
          context,
          toastPosition: GFToastPosition.BOTTOM,
        );
      } else {
        print('Error message: ${response.body}');
        showDialog(
          context: context,
          builder: (context) => AlertDialog(
            title: const Text('Error'),
            content: const Text('Failed to update car.'),
            actions: <Widget>[
              TextButton(
                onPressed: () {
                  Navigator.of(context).pop();
                },
                child: Text('OK'),
              ),
            ],
          ),
        );
      }
    } catch (e) {
      print('Error updating car: $e');
      showDialog(
        context: context,
        builder: (context) => AlertDialog(
          title: const Text('Error'),
          content: Text('Failed to update car. Please try again later.'),
          actions: <Widget>[
            TextButton(
              onPressed: () {
                Navigator.of(context).pop();
              },
              child: const Text('OK'),
            ),
          ],
        ),
      );
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(widget.police_number),
        backgroundColor: Colors.black,
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(20.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            Image.network(
              widget.imageUrl,
              height: 150,
              width: 150,
              fit: BoxFit.cover,
            ),
            const SizedBox(height: 20),
            TextFormField(
              controller: _titleController,
              decoration: const InputDecoration(labelText: 'Title'),
            ),
            const SizedBox(height: 10),
            TextFormField(
              controller: _descriptionController,
              decoration: const InputDecoration(labelText: 'Description'),
              maxLines: null,
            ),
            const SizedBox(height: 10),
            TextFormField(
              controller: _priceController,
              decoration: const InputDecoration(labelText: 'Price'),
              keyboardType: TextInputType.number,
            ),
            const SizedBox(height: 20),
            GFButton(
              onPressed: _updateCar,
              text: 'Update Car',
              size: GFSize.LARGE,
              blockButton: true,
            ),
          ],
        ),
      ),
    );
  }
}
