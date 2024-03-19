import 'package:flutter/material.dart';
import 'package:frontend/Pages/Components/Data/Car/CarDetail.dart';

class CarVerticalImage extends StatefulWidget {
  final int carId;
  final String imageUrl;
  final String title;
  final String description;
  final String price;
  final String note;

  const CarVerticalImage({
    Key? key,
    required this.carId,
    required this.imageUrl,
    required this.title,
    required this.description,
    required this.price,
    required this.note,
  }) : super(key: key);
  @override
  _CarVerticalImageState createState() => _CarVerticalImageState();
}

class _CarVerticalImageState extends State<CarVerticalImage> {
  bool _isTapped = false;

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTapDown: (_) {
        setState(() {
          _isTapped = true;
        });
      },
      onTapUp: (_) {
        setState(() {
          _isTapped = false;
        });
        _navigateToDetail(context);
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
        child: Card(
          color: Colors.white.withOpacity(0.05),
          margin: const EdgeInsets.all(5),
          child: Column(
            children: [
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
              ListTile(
                title: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      widget.title,
                      overflow: TextOverflow.ellipsis,
                      maxLines: 2,
                      style: const TextStyle(
                        fontSize: 15,
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                    Text(
                      widget.description.length > 100
                          ? '${widget.description.substring(0, 100)}...'
                          : widget.description,
                      overflow: TextOverflow.ellipsis,
                      maxLines: 1,
                      style: const TextStyle(
                        fontSize: 11,
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                  ],
                ),
                subtitle: Text(
                  widget.price,
                  style: const TextStyle(fontSize: 12),
                ),
              ),
              Container(
                padding: const EdgeInsets.all(10),
                child: const Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    Row(
                      children: [
                        Icon(
                          Icons.car_crash,
                          color: Colors.white,
                        ),
                        SizedBox(width: 5),
                        Text(
                          "MPV",
                          style: TextStyle(
                            color: Colors.white,
                            fontWeight: FontWeight.bold,
                          ),
                        ),
                      ],
                    ),
                    SizedBox(width: 15),
                    Row(
                      children: [
                        Icon(
                          Icons.settings,
                          color: Colors.white,
                        ),
                        SizedBox(width: 5),
                        Text(
                          "4x2",
                          style: TextStyle(
                            color: Colors.white,
                            fontWeight: FontWeight.bold,
                          ),
                        ),
                      ],
                    ),
                    SizedBox(width: 15),
                    Row(
                      children: [
                        Icon(
                          Icons.local_gas_station_sharp,
                          color: Colors.white,
                        ),
                        SizedBox(width: 5),
                        Text(
                          "Premium",
                          style: TextStyle(
                            color: Colors.white,
                            fontWeight: FontWeight.bold,
                          ),
                        ),
                      ],
                    ),
                    SizedBox(width: 15),
                    Row(
                      children: [
                        Icon(
                          Icons.chair,
                          color: Colors.white,
                        ),
                        SizedBox(width: 5),
                        Text(
                          "3 Rows",
                          style: TextStyle(
                            color: Colors.white,
                            fontWeight: FontWeight.bold,
                          ),
                        ),
                      ],
                    ),
                  ],
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }

  void _navigateToDetail(BuildContext context) {
    Navigator.push(
      context,
      MaterialPageRoute(
        builder: (context) => CarDetail(
          carId: widget.carId.toString(),
          price: widget.price,
          imageUrl: widget.imageUrl,
          title: widget.title,
          description: widget.description,
          note: widget.note,
        ),
      ),
    );
  }
}
