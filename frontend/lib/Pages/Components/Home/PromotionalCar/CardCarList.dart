import 'package:flutter/material.dart';
import 'package:frontend/Pages/Components/Home/PromotionalCar/CardCarDetail.dart';
import 'package:frontend/Pages/Components/Home/PromotionalCar/CardImage.dart';

class CardCarList extends StatelessWidget {
  final List<Map<String, String>> carItem;

  const CardCarList({
    Key? key,
    required this.carItem,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        const Row(
          crossAxisAlignment: CrossAxisAlignment.baseline,
          textBaseline: TextBaseline.ideographic,
          children: [
            Text(
              'Mobil Promosi',
              textAlign: TextAlign.right,
              style: TextStyle(
                color: Colors.black,
                fontWeight: FontWeight.bold,
              ),
            ),
            Icon(
              Icons.discount,
              size: 10,
              color: Color.fromARGB(255, 247, 181, 0),
            )
          ],
        ),
        SizedBox(
          height: 200,
          child: ListView.builder(
            scrollDirection: Axis.horizontal,
            itemCount: carItem.length,
            itemBuilder: (context, index) {
              var item = carItem[index];
              CardCardItem(
                carData: item,
              );
            },
          ),
        ),
      ],
    );
  }
}

class CardCardItem extends StatefulWidget {
  final Map<String, String> carData;

  const CardCardItem({Key? key, required this.carData}) : super(key: key);

  @override
  State<CardCardItem> createState() => _CardCardItemState();
}

class _CardCardItemState extends State<CardCardItem> {
  double scaleValue = 1.0;

  void _navigateToDetailCar(BuildContext context) {
    if (widget.carData['id'] != null &&
        widget.carData['imageUrl'] != null &&
        widget.carData['title'] != null &&
        widget.carData['subtitle'] != null &&
        widget.carData['note'] != null) {
      Navigator.push(
        context,
        MaterialPageRoute(
          builder: (context) => CardCarDetail(
            imageUrl: widget.carData['imageUrl']!,
            title: widget.carData['title']!,
            subtitle: widget.carData['subtitle']!,
            note: widget.carData['note']!,
          ),
        ),
      );
    } else {
      // Handle missing data case
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
              color: Colors.white,
              borderRadius: BorderRadius.circular(5),
            ),
            child: CardWithImage(
              imageUrl: widget.carData['imageUrl']!,
              title: widget.carData['title']!,
              subtitle: widget.carData['subtitle']!,
              note: widget.carData['note']!,
            ),
          ),
        ),
      ),
    );
  }
}
