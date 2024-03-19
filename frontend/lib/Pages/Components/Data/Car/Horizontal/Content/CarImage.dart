import 'package:flutter/material.dart';

class CarImage extends StatefulWidget {
  final String carId;
  final String imageUrl;
  final String title;
  final String price;
  final String note;
  final String description;

  const CarImage({
    Key? key,
    required this.carId,
    required this.imageUrl,
    required this.title,
    required this.price,
    required this.note,
    required this.description,
  }) : super(key: key);

  @override
  State<CarImage> createState() => _CarImageState();
}

class _CarImageState extends State<CarImage> {
  @override
  Widget build(BuildContext context) {
    return Card(
      color: Colors.white70.withOpacity(0.1),
      margin: const EdgeInsets.all(5),
      child: Column(
        children: [
          ClipRRect(
            borderRadius: const BorderRadius.vertical(top: Radius.circular(10)),
            child: Image.network(
              widget.imageUrl,
              height: 100,
              width: double.infinity,
              fit: BoxFit.cover,
              loadingBuilder: (BuildContext context, Widget child,
                  ImageChunkEvent? loadingProgress) {
                if (loadingProgress == null) return child;
                return CircularProgressIndicator(
                  value: loadingProgress.expectedTotalBytes != null
                      ? loadingProgress.cumulativeBytesLoaded /
                          loadingProgress.expectedTotalBytes!
                      : null,
                );
              },
            ),
          ),
          ListTile(
            title: Text(
              widget.title,
              overflow: TextOverflow.ellipsis,
              maxLines: 2,
              style: const TextStyle(
                fontSize: 11,
                fontWeight: FontWeight.bold,
              ),
            ),
            subtitle: Text(
              widget.price,
              style: const TextStyle(fontSize: 12),
            ),
          ),
        ],
      ),
    );
  }
}
