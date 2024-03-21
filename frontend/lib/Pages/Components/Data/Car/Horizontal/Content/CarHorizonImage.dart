import 'package:flutter/material.dart';

class CarHorizonImage extends StatefulWidget {
  final String carId;
  final String imageUrl;
  final String title;
  final String police_number;
  final String slug;
  final String price;
  final String note;
  final String description;

  const CarHorizonImage({
    Key? key,
    required this.carId,
    required this.imageUrl,
    required this.title,
    required this.police_number,
    required this.slug,
    required this.price,
    required this.note,
    required this.description,
  }) : super(key: key);

  @override
  State<CarHorizonImage> createState() => _CarHorizonImageState();
}

class _CarHorizonImageState extends State<CarHorizonImage> {
  @override
  Widget build(BuildContext context) {
    return Card(
      color: Colors.white70.withOpacity(0.1),
      margin: const EdgeInsets.all(5),
      child: Column(
        children: [
          Stack(
            children: [
              const Positioned(
                top: 0,
                left: 0,
                child: Text(
                  'Teks di atas kiri',
                  style: TextStyle(
                    fontSize: 20,
                    fontWeight: FontWeight.bold,
                  ),
                ),
              ),
              ClipRRect(
                borderRadius:
                    const BorderRadius.vertical(top: Radius.circular(10)),
                child: Image.network(
                  widget.imageUrl,
                  height: 200,
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
            ],
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
