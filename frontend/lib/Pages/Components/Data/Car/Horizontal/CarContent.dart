import 'package:flutter/material.dart';
import 'package:frontend/Model/Services/Cars/fetchCar.dart';
import 'package:frontend/Pages/Components/Data/Car/CarList.dart';
import 'package:frontend/Pages/Components/Data/Car/Vertical/CarImage.dart';
import 'package:frontend/Pages/Components/Home/PromotionalCar/CardCarDetail.dart';
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
  bool _isTapped = false; // Declare _isTapped variable

  late String formattedPrice;

  @override
  void initState() {
    super.initState();
    _formatPrice();
  }

  void _formatPrice() {
    // Check if 'price' key exists and is not null
    if (widget.carData.containsKey('price') &&
        widget.carData['price'] != null) {
      // Convert 'price' to int
      int? price = widget.carData['price'];
      // Format price
      formattedPrice =
          NumberFormat.currency(locale: 'id_ID', symbol: 'Rp').format(price);
    } else {
      formattedPrice = 'Price not available'; // Default value if price is null
    }
  }

  void _navigateToDetailCar(BuildContext context) {
    print('Car Data: ${widget.carData}');
    print('Keys: ${widget.carData.keys.toList()}');

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
          _navigateToDetailCar(context); // Navigate to detail car
        },
        onTapCancel: () {
          setState(() {
            _isTapped = false;
          });
        },
        child: AnimatedContainer(
          duration: const Duration(milliseconds: 300),
          transform: _isTapped
              ? Matrix4.diagonal3Values(1, 0.95, 0.95)
              : Matrix4.identity(),
          alignment: Alignment.center,
          child: Container(
            width: 200,
            height: 200,
            decoration: BoxDecoration(
              color: Colors.black,
              borderRadius: BorderRadius.circular(5),
            ),
            child: CarVerticalImage(
              imageUrl:
                  'https://www.auto88group.com/image/car/1775/20240201113209.jpg',
              title: widget.carData['title']!.length > 50
                  ? widget.carData['title']!.substring(0, 50) + '...'
                  : widget.carData['title']!,
              description: widget.carData['description']!,
              price: formattedPrice,
              note: widget.carData['created_at']!,
            ),
          ),
        ),
      ),
    );
  }
}
