import 'package:flutter/material.dart';

class CardWithImage extends StatelessWidget {
  final String imageUrl;
  final String title;
  final String subtitle;
  final String note;

  const CardWithImage({
    Key? key,
    required this.imageUrl,
    required this.title,
    required this.subtitle,
    required this.note,
  }) : super(key: key);

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
              imageUrl,
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
                        : null);
              },
            ),
          ),
          ListTile(
            title: Text(
              title,
              overflow: TextOverflow.ellipsis,
              maxLines: 2,
              style: const TextStyle(
                fontSize: 11,
                fontWeight: FontWeight.bold,
              ),
            ),
            subtitle: Text(
              subtitle,
              style: const TextStyle(fontSize: 12),
            ),
          ),
        ],
      ),
    );
  }
}
