import 'package:flutter/material.dart';
import 'package:frontend/Model/Services/Cars/fetchCar.dart';
import 'package:frontend/Pages/Components/Data/Car/CarDetail.dart';
import 'package:frontend/Pages/Components/Data/Car/CarList.dart';
import 'package:frontend/Pages/Components/Data/Car/Horizontal/Content/CarImage.dart';
import 'package:intl/intl.dart';

class CarContent extends StatefulWidget {
  const CarContent({Key? key}) : super(key: key);

  @override
  State<CarContent> createState() => _CarContentState();
}

class _CarContentState extends State<CarContent> {
  late List<Map<String, dynamic>> _dataCars;
  bool _isLoading = true;
  final ScrollController _scrollController = ScrollController();

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

  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      mainAxisAlignment: MainAxisAlignment.start,
      children: [
        const PageTitle(),
        _isLoading
            ? const Center(child: CircularProgressIndicator())
            : SizedBox(
                height: 180,
                child: ListView.builder(
                  scrollDirection: Axis.horizontal,
                  itemCount: _dataCars.length,
                  controller: _scrollController,
                  itemBuilder: (BuildContext context, int index) {
                    var item = _dataCars[index];
                    return CarList(
                      carData: item,
                    );
                  },
                ),
              ),
      ],
    );
  }
}

class PageTitle extends StatelessWidget {
  const PageTitle({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return const Row(
      crossAxisAlignment: CrossAxisAlignment.start,
      mainAxisAlignment: MainAxisAlignment.start,
      textBaseline: TextBaseline.ideographic,
      children: [
        Row(
          mainAxisAlignment: MainAxisAlignment.center,
          crossAxisAlignment: CrossAxisAlignment.center,
          children: [
            Text(
              'Baru ditambahkan',
              textAlign: TextAlign.right,
              style: TextStyle(
                color: Colors.white,
                fontWeight: FontWeight.bold,
              ),
            ),
            SizedBox(width: 4),
            Icon(
              Icons.new_releases,
              size: 14,
              color: Colors.white,
            )
          ],
        ),
      ],
    );
  }
}

class PageContent extends StatefulWidget {
  final Map<String, dynamic> carData;

  const PageContent({Key? key, required this.carData}) : super(key: key);

  @override
  State<PageContent> createState() => _PageContentState();
}

class _PageContentState extends State<PageContent> {
  bool _isTapped = false;
  late String formattedPrice;

  @override
  void initState() {
    super.initState();
    _formatPrice();
  }

  void _formatPrice() {
    if (widget.carData.containsKey('price') && widget.carData['price'] is int) {
      int price = widget.carData['price'];
      formattedPrice = NumberFormat.currency(locale: 'id_ID', symbol: 'Rp')
          .format(price.toDouble());
    } else {
      formattedPrice = 'Price not available';
    }
  }

  void _navigateToDetailCar(BuildContext context) {
    if (widget.carData.containsKey('id') &&
        widget.carData.containsKey('title') &&
        widget.carData.containsKey('created_at')) {
      // Extracting other fields
      String title =
          widget.carData['title']?.toString() ?? 'Title not available';
      String description = widget.carData['description']?.toString() ??
          'Description not available';
      String imageUrl = widget.carData['imageUrl']?.toString() ?? '';
      String createdAt = widget.carData['created_at']?.toString() ?? '';

      // Handling carId
      String carId = widget.carData['id']?.toString() ?? '';

      // Handling price
      String price;
      if (widget.carData['price'] is int) {
        int carPrice = widget.carData['price'];
        price = NumberFormat.currency(locale: 'id_ID', symbol: 'Rp')
            .format(carPrice);
      } else {
        price = 'Price not available';
      }

      // Navigating to the CarDetail page with the extracted data
      Navigator.push(
        context,
        MaterialPageRoute(
          builder: (context) => CarDetail(
            imageUrl: imageUrl,
            title: title,
            carId: carId,
            price: price,
            description: description,
            note: createdAt,
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

  @override
  Widget build(BuildContext context) {
    return Expanded(
      child: GestureDetector(
        onTapDown: (_) {
          setState(() {
            _isTapped = true;
          });
        },
        onTapUp: (_) {
          setState(() {
            _isTapped = false;
          });
          _navigateToDetailCar(context);
        },
        onTapCancel: () {
          setState(() {
            _isTapped = false;
          });
        },
        child: AnimatedContainer(
          duration: const Duration(milliseconds: 300),
          transform: _isTapped
              ? Matrix4.diagonal3Values(0.98, 1.0, 1.0)
              : Matrix4.identity(),
          alignment: Alignment.center,
          child: Container(
            width: 200,
            height: 200,
            decoration: BoxDecoration(
              color: Colors.black,
              borderRadius: BorderRadius.circular(5),
            ),
            child: CarImage(
              imageUrl: widget.carData['imageUrl']?.toString() ?? '',
              title:
                  widget.carData['title']?.toString() ?? 'Title not available',
              description: widget.carData['description']?.toString() ??
                  'Description not available',
              carId: widget.carData['id'].toString(),
              price: formattedPrice,
              note: widget.carData['created_at']?.toString() ?? '',
            ),
          ),
        ),
      ),
    );
  }
}
