import 'package:flutter/material.dart';
import 'package:frontend/Pages/Components/Home/PromotionalCar/CardCarDetail.dart';

class ListDataHoriCar extends StatefulWidget {
  final Map<String, dynamic> carData;

  const ListDataHoriCar({Key? key, required this.carData}) : super(key: key);

  @override
  _ListDataHoriCarState createState() => _ListDataHoriCarState();
}

class _ListDataHoriCarState extends State<ListDataHoriCar> {
  bool _isTapped = false;

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: () {
        Navigator.push(
          context,
          MaterialPageRoute(
            builder: (context) => CardCarDetail(
              imageUrl:
                  'https://www.auto88group.com/image/car/1775/20240201113209.jpg',
              title: widget.carData['title']!,
              subtitle: widget.carData['price'] != null
                  ? '\$${widget.carData['price']}'
                  : 'Price not available',
              description: widget.carData['description'] ?? '',
              note: widget.carData['created_at']!,
            ),
          ),
        );
      },
      onTapDown: (_) {
        setState(() {
          _isTapped = true;
        });
      },
      onTapUp: (_) {
        setState(() {
          _isTapped = false;
        });
      },
      onTapCancel: () {
        setState(() {
          _isTapped = false;
        });
      },
      child: AnimatedContainer(
        duration: const Duration(milliseconds: 200),
        curve: Curves.easeInOut,
        transform: _isTapped
            ? Matrix4.diagonal3Values(1, 0.95, 0.95)
            : Matrix4.identity(),
        alignment: Alignment.center,
        child: Container(
          width: 200,
          margin: const EdgeInsets.only(right: 8),
          decoration: BoxDecoration(
            color: Colors.white.withOpacity(0.1),
            borderRadius: BorderRadius.circular(5),
          ),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              ClipRRect(
                borderRadius:
                    const BorderRadius.vertical(top: Radius.circular(5)),
                child: Image.network(
                  'https://www.auto88group.com/image/car/1775/20240201113209.jpg',
                  height: 100,
                  width: double.infinity,
                  fit: BoxFit.cover,
                ),
              ),
              Padding(
                padding: const EdgeInsets.all(8.0),
                child: Text(
                  widget.carData['title']!,
                  overflow: TextOverflow.ellipsis,
                  style: const TextStyle(
                    color: Colors.white,
                    fontWeight: FontWeight.bold,
                  ),
                ),
              ),
              Padding(
                padding: const EdgeInsets.symmetric(horizontal: 8.0),
                child: Text(
                  widget.carData['description'] ?? '',
                  overflow: TextOverflow.ellipsis,
                  maxLines: 2,
                  style: const TextStyle(color: Colors.white, fontSize: 11),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
