import 'package:flutter/material.dart';
import 'package:frontend/Pages/Components/Data/Car/CarDetail.dart';

class CarHorizonList extends StatefulWidget {
  final Map<String, dynamic> carData;

  const CarHorizonList({Key? key, required this.carData}) : super(key: key);

  @override
  _CarHorizonListState createState() => _CarHorizonListState();
}

class _CarHorizonListState extends State<CarHorizonList> {
  bool _isTapped = false;

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: () {
        Navigator.push(
          context,
          MaterialPageRoute(
            builder: (context) => CarDetail(
              imageUrl:
                  'https://www.auto88group.com/image/car/1775/20240201113209.jpg',
              title: widget.carData['title']!.toString(),
              slug: widget.carData['slug']!.toString(),
              carId: widget.carData['id']!.toString(),
              price: widget.carData['price'] != null
                  ? '\$${widget.carData['price']}'
                  : 'Price not available',
              description: widget.carData['description'] ?? '',
              note: widget.carData['created_at']!.toString(),
              police_number: widget.carData['police_number']!.toString(),
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
              Stack(
                alignment: Alignment.topLeft,
                children: [
                  Image.network(
                    'https://www.auto88group.com/image/car/1775/20240201113209.jpg',
                    height: 90,
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
                ],
              ),
              Container(
                color: Colors.amber.shade900,
                padding: const EdgeInsets.symmetric(horizontal: 8),
                height: 20,
                child: const Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    Row(
                      children: [
                        Icon(
                          Icons.car_crash,
                          size: 10,
                          color: Colors.white,
                        ),
                        SizedBox(width: 2),
                        Text(
                          "MPV",
                          style: TextStyle(
                            fontSize: 8,
                            color: Colors.white,
                            fontWeight: FontWeight.bold,
                          ),
                        ),
                      ],
                    ),
                    SizedBox(width: 4),
                    Row(
                      children: [
                        Icon(
                          Icons.settings,
                          size: 10,
                          color: Colors.white,
                        ),
                        SizedBox(width: 2),
                        Text(
                          "4x2",
                          style: TextStyle(
                            fontSize: 8,
                            color: Colors.white,
                            fontWeight: FontWeight.bold,
                          ),
                        ),
                      ],
                    ),
                    SizedBox(width: 4),
                    Row(
                      children: [
                        Icon(
                          Icons.local_gas_station_sharp,
                          size: 10,
                          color: Colors.white,
                        ),
                        SizedBox(width: 2),
                        Text(
                          "Premium",
                          style: TextStyle(
                            fontSize: 8,
                            color: Colors.white,
                            fontWeight: FontWeight.bold,
                          ),
                        ),
                      ],
                    ),
                    SizedBox(width: 4),
                    Row(
                      children: [
                        Icon(
                          Icons.chair,
                          size: 10,
                          color: Colors.white,
                        ),
                        SizedBox(width: 2),
                        Text(
                          "3 Rows",
                          style: TextStyle(
                            fontSize: 8,
                            color: Colors.white,
                            fontWeight: FontWeight.bold,
                          ),
                        ),
                      ],
                    ),
                  ],
                ),
              ),
              Container(
                decoration: BoxDecoration(
                  color: Colors.white.withOpacity(0.1),
                  borderRadius: BorderRadius.zero,
                ),
                child: Padding(
                  padding: const EdgeInsets.fromLTRB(8, 4, 8, 4),
                  child: Text(
                    widget.carData['police_number'].toString(),
                    overflow: TextOverflow.ellipsis,
                    maxLines: 1,
                    style: const TextStyle(
                      color: Colors.white,
                      fontSize: 10,
                      fontWeight: FontWeight.w600,
                    ),
                  ),
                ),
              ),
              Padding(
                padding: const EdgeInsets.symmetric(horizontal: 8.0),
                child: Text(
                  widget.carData['title']!,
                  overflow: TextOverflow.ellipsis,
                  maxLines: 1,
                  style: const TextStyle(
                    color: Colors.white,
                    fontWeight: FontWeight.bold,
                  ),
                ),
              ),
              Padding(
                padding: const EdgeInsets.symmetric(horizontal: 8.0),
                child: Text(
                  widget.carData['price'].toString(),
                  overflow: TextOverflow.ellipsis,
                  maxLines: 2,
                  style: const TextStyle(color: Colors.white, fontSize: 9),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
