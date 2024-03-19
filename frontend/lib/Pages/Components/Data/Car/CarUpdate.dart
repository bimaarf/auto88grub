import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'package:flutter_dotenv/flutter_dotenv.dart';

class UpdateCarPage extends StatefulWidget {
  final String carId;
  final String imageUrl;
  final String title;
  final String price;
  final String note;
  final String description;

  const UpdateCarPage({
    Key? key,
    required this.carId,
    required this.imageUrl,
    required this.title,
    required this.price,
    required this.description,
    required this.note,
  }) : super(key: key);
  @override
  _UpdateCarPageState createState() => _UpdateCarPageState();
}

class _UpdateCarPageState extends State<UpdateCarPage> {
  late TextEditingController _titleController;
  late TextEditingController _descriptionController;
  late TextEditingController _priceController;

  @override
  void initState() {
    _titleController = TextEditingController(text: widget.title);
    _descriptionController = TextEditingController(text: widget.description);
    _priceController = TextEditingController(text: widget.price);
    super.initState();
  }

  @override
  void dispose() {
    _titleController.dispose();
    _descriptionController.dispose();
    _priceController.dispose();
    super.dispose();
  }

  Future<void> _updateCar() async {
    String newTitle = _titleController.text;
    String newDescription = _descriptionController.text;
    String newPrice = _priceController.text;

    // Load base URL from environment variables
    await dotenv.load();
    String baseUrl = dotenv.env['BASE_URL'] ?? 'https://example.com';

    final response = await http.put(
      Uri.parse('$baseUrl/api/car/update/${widget.carId}'),
      body: {
        'title': newTitle,
        'description': newDescription,
        'price': newPrice,
      },
    );

    if (response.statusCode == 200) {
      // Successfully updated the car
      // You can show a success message or navigate back to the previous screen
      Navigator.pop(context);
    } else {
      // Failed to update the car
      // You can show an error message or handle the error accordingly
      showDialog(
        context: context,
        builder: (context) => AlertDialog(
          title: Text('Error'),
          content: Text('Failed to update car.'),
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
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Update Car'),
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
            ElevatedButton(
              onPressed: _updateCar,
              child: const Text('Update'),
            ),
          ],
        ),
      ),
    );
  }
}
