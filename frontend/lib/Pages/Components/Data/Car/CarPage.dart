import 'package:flutter/material.dart';
import 'package:frontend/Model/Services/Cars/fetchCar.dart';
import 'package:frontend/Pages/Components/Home/PromotionalCar/CardCarDetail.dart';
import 'package:frontend/Pages/Components/Home/PromotionalCar/CardImage.dart';
import 'package:intl/intl.dart';

class CardCardItem extends StatefulWidget {
  final Map<String, dynamic> carData;

  const CardCardItem({Key? key, required this.carData}) : super(key: key);

  @override
  State<CardCardItem> createState() => _CardCardItemState();
}

class CarPage extends StatefulWidget {
  const CarPage({Key? key}) : super(key: key);

  @override
  State<CarPage> createState() => _CarPageState();
}

class _CardCardItemState extends State<CardCardItem> {
  double scaleValue = 1.0;
  late String formattedPrice;

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTapDown: (_) {
        setState(() {
          scaleValue = 0.98;
        });
      },
      onTapUp: (_) {
        setState(() {
          scaleValue = 1.0;
        });
        _navigateToDetailCar(context);
      },
      onTapCancel: () {
        setState(() {
          scaleValue = 1.0;
        });
      },
      child: AnimatedContainer(
        duration: const Duration(milliseconds: 500),
        transform: Matrix4.diagonal3Values(scaleValue, scaleValue, 2.0),
        child: Container(
          width: 200,
          decoration: BoxDecoration(
            color: Colors.black,
            borderRadius: BorderRadius.circular(5),
          ),
          child: CardWithImage(
            imageUrl:
                'https://www.auto88group.com/image/car/1775/20240201113209.jpg',
            title: widget.carData['title']!.length > 300
                ? widget.carData['title']!.substring(0, 300) + '...'
                : widget.carData['title']!,
            description: widget.carData['description'] ?? '',
            price: formattedPrice,
            note: widget.carData['created_at']!,
          ),
        ),
      ),
    );
  }

  @override
  void initState() {
    super.initState();
    _formatPrice();
  }

  void _formatPrice() {
    int price = widget.carData['price'];
    formattedPrice =
        NumberFormat.currency(locale: 'id_ID', symbol: 'Rp').format(price);
  }

  void _navigateToDetailCar(BuildContext context) {
    if (widget.carData.containsKey('id') &&
        widget.carData.containsKey('title') &&
        widget.carData.containsKey('created_at')) {
      // Check if description is null or empty
      String description = widget.carData['description'] ?? '';

      Navigator.push(
        context,
        MaterialPageRoute(
          builder: (context) => CardCarDetail(
            imageUrl:
                'https://www.auto88group.com/image/car/1775/20240201113209.jpg',
            title: widget.carData['title']!,
            subtitle: formattedPrice,
            description: description,
            note: widget.carData['created_at']!,
          ),
        ),
      );
    } else {
      showDialog(
        context: context,
        builder: (BuildContext context) {
          return AlertDialog(
            title: const Text("Error"),
            content: const Text("Missing car details. Unable to navigate."),
            actions: <Widget>[
              TextButton(
                child: const Text("OK"),
                onPressed: () {
                  Navigator.of(context).pop();
                },
              ),
            ],
          );
        },
      );
    }
  }
}

class _CarPageState extends State<CarPage> {
  late List<Map<String, dynamic>> _dataCars;
  bool _isLoading = true;

  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Car'),
        backgroundColor: Colors.black,
        actions: <Widget>[
          IconButton(
            icon: const Icon(
              Icons.notifications,
              color: Colors.white,
            ),
            onPressed: () {
              showDialog(
                context: context,
                builder: (BuildContext context) {
                  return AlertDialog(
                    title: const Text('Notifications'),
                    content: const Text('Notification settings here.'),
                    actions: <Widget>[
                      TextButton(
                        onPressed: () {
                          Navigator.of(context).pop();
                        },
                        child: const Text('Close'),
                      ),
                    ],
                  );
                },
              );
            },
          ),
          IconButton(
            icon: const Icon(
              Icons.settings,
              color: Colors.white,
            ),
            onPressed: () {
              showDialog(
                context: context,
                builder: (BuildContext context) {
                  return AlertDialog(
                    title: const Text('Settings'),
                    content: const Text('App settings here.'),
                    actions: <Widget>[
                      TextButton(
                        onPressed: () {
                          Navigator.of(context).pop();
                        },
                        child: const Text('Close'),
                      ),
                    ],
                  );
                },
              );
            },
          ),
        ],
      ),
      body: _isLoading
          ? const Center(child: CircularProgressIndicator())
          : ListView.builder(
              itemCount: _dataCars.length,
              itemBuilder: (BuildContext context, int index) {
                final carData = _dataCars[index];
                return CardCardItem(carData: carData);
              },
            ),
    );
  }

  @override
  void initState() {
    super.initState();
    _fetchData();
  }

  Future<void> _fetchData() async {
    setState(() {
      _isLoading = true;
    });

    try {
      final List<Map<String, dynamic>> responseData =
          await ServiceCarList.fetchCar();
      setState(() {
        _dataCars = responseData;
      });
    } catch (e) {
      showDialog(
        context: context,
        builder: (BuildContext context) {
          return AlertDialog(
            title: const Text("Error"),
            content:
                const Text("Failed to fetch data. Please try again later."),
            actions: <Widget>[
              TextButton(
                child: const Text("OK"),
                onPressed: () {
                  Navigator.of(context).pop();
                },
              ),
            ],
          );
        },
      );
    } finally {
      setState(() {
        _isLoading = false;
      });
    }
  }
}
