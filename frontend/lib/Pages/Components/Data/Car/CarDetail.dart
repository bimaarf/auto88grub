import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:frontend/Model/Services/Cars/fetchDetailCar.dart';
import 'package:frontend/Pages/Components/Data/Car/CarUpdate.dart';

class CarDetail extends StatefulWidget {
  final String carId;
  final String imageUrl;
  final String title;
  final String slug;
  final String note;
  final String price;
  final String description;
  final String policeNumber;

  const CarDetail({
    Key? key,
    required this.carId,
    required this.imageUrl,
    required this.title,
    required this.slug,
    required this.price,
    required this.description,
    required this.note,
    required this.policeNumber,
  }) : super(key: key);

  @override
  State<CarDetail> createState() => _CarDetailState();
}

class _CarDetailState extends State<CarDetail> {
  bool isLoading = false;
  late Map<String, dynamic> carDetail = {};

  @override
  void initState() {
    super.initState();
    fetchDetailCar();
  }

  Future<void> fetchDetailCar() async {
    try {
      setState(() {
        isLoading = true;
      });
      carDetail =
          await ServiceDetailCar.fetchCarDetail(widget.carId, widget.slug);
    } catch (e) {
      print('Error fetching car detail: $e');
    } finally {
      setState(() {
        isLoading = false;
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        backgroundColor: Colors.black,
        title: Text(widget.policeNumber),
        actions: <Widget>[
          IconButton(
            icon: const Icon(
              Icons.notifications,
              color: Colors.white,
            ),
            onPressed: () {
              // Existing notification dialog
            },
          ),
          PopupMenuButton<String>(
            onSelected: (String result) {
              if (result == 'update') {
                Navigator.push(
                  context,
                  MaterialPageRoute(
                    builder: (context) => UpdateCarPage(
                      carId: widget.carId,
                      imageUrl: widget.imageUrl,
                      title: widget.title,
                      slug: widget.slug,
                      price: widget.price,
                      description: widget.description,
                      note: widget.note,
                      policeNumber: widget.policeNumber,
                    ),
                  ),
                ).then((value) {
                  if (value != null && value) {
                    // Refresh detail car jika perlu
                    fetchDetailCar();
                  }
                });
              } else {
                // Handle other menu item selections here
              }
            },
            itemBuilder: (BuildContext context) => <PopupMenuEntry<String>>[
              const PopupMenuItem<String>(
                value: 'update',
                child: Text('Update'),
              ),
              const PopupMenuItem<String>(
                value: 'settings',
                child: Text('Settings'),
              ),
              const PopupMenuItem<String>(
                value: 'about',
                child: Text('About'),
              ),
            ],
          ),
        ],
      ),
      body: isLoading
          ? Center(child: CircularProgressIndicator())
          : SingleChildScrollView(
              physics: const AlwaysScrollableScrollPhysics(),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Image.network(
                    widget.imageUrl,
                    height: 275,
                    width: double.infinity,
                    fit: BoxFit.cover,
                  ),
                  Container(
                    color: Colors.black45,
                    padding: const EdgeInsets.all(10),
                    width: double.infinity,
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(
                          carDetail['title'],
                          style: const TextStyle(fontWeight: FontWeight.bold),
                        ),
                        const Text(
                          'Description :',
                          style: TextStyle(
                            color: Colors.white,
                            fontWeight: FontWeight.bold,
                          ),
                        ),
                        Text(
                          carDetail['description'],
                          style: const TextStyle(
                            color: Colors.white,
                            fontWeight: FontWeight.bold,
                          ),
                        ),
                      ],
                    ),
                  ),
                ],
              ),
            ),
    );
  }
}
