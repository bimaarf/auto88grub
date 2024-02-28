import 'package:flutter/material.dart';
import 'package:frontend/Model/Services/Cars/fetchCar.dart';
import 'package:frontend/Pages/Components/Home/PromotionalCar/CardCarDetail.dart';
import 'package:frontend/Pages/Components/Home/PromotionalCar/CardImage.dart';
import 'package:intl/intl.dart';

class CardCarList extends StatefulWidget {
  const CardCarList({Key? key}) : super(key: key);

  @override
  State<CardCarList> createState() => _CardCarListState();
}

class _CardCarListState extends State<CardCarList> {
  late List<Map<String, dynamic>> _dataCars;
  bool _isLoading = true;

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
        _isLoading = false;
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

      setState(() {
        _isLoading = false;
      });
    }
  }

  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        const MobilRow(),
        _isLoading
            ? CircularProgressIndicator()
            : SizedBox(
                height: 200,
                child: ListView.builder(
                  scrollDirection: Axis.horizontal,
                  itemCount: _dataCars.length,
                  itemBuilder: (context, index) {
                    var item = _dataCars[index];
                    return CardCardItem(
                      carData: item,
                    );
                  },
                ),
              ),
      ],
    );
  }
}

class MobilRow extends StatelessWidget {
  const MobilRow({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return const Row(
      crossAxisAlignment: CrossAxisAlignment.baseline,
      mainAxisAlignment: MainAxisAlignment.spaceBetween,
      textBaseline: TextBaseline.ideographic,
      children: [
        Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
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

class CardCardItem extends StatefulWidget {
  final Map<String, dynamic> carData;

  const CardCardItem({Key? key, required this.carData}) : super(key: key);

  @override
  State<CardCardItem> createState() => _CardCardItemState();
}

class _CardCardItemState extends State<CardCardItem> {
  double scaleValue = 1.0;
  late String formattedPrice;

  @override
  void initState() {
    super.initState();
    _formatPrice();
  }

  void _formatPrice() {
    int price = widget.carData['price'];
    formattedPrice = NumberFormat.currency(locale: 'id_ID', symbol: 'Rp')
        .format(price / 100);
  }

  void _navigateToDetailCar(BuildContext context) {
    print('Car Data: ${widget.carData}');
    print('Keys: ${widget.carData.keys.toList()}');

    if (widget.carData.containsKey('id') &&
        widget.carData.containsKey('title') &&
        widget.carData.containsKey('description') &&
        widget.carData.containsKey('created_at')) {
      Navigator.push(
        context,
        MaterialPageRoute(
          builder: (context) => CardCarDetail(
            imageUrl:
                'https://www.auto88group.com/image/car/1775/20240201113209.jpg',
            title: widget.carData['title']!,
            subtitle: 'Rp $formattedPrice',
            description: widget.carData['description']!,
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
          duration: const Duration(milliseconds: 200),
          transform: Matrix4.diagonal3Values(scaleValue, scaleValue, 1.0),
          child: Container(
            width: 200,
            height: 200,
            decoration: BoxDecoration(
              color: Colors.black,
              borderRadius: BorderRadius.circular(5),
            ),
            child: CardWithImage(
              imageUrl:
                  'https://www.auto88group.com/image/car/1775/20240201113209.jpg',
              title: widget.carData['title']!.length > 50
                  ? widget.carData['title']!.substring(0, 50) + '...'
                  : widget.carData['title']!,
              subtitle: 'Rp $formattedPrice',
              note: widget.carData['created_at']!,
            ),
          ),
        ),
      ),
    );
  }
}
