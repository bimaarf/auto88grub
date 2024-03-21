import 'package:flutter/material.dart';
import 'package:frontend/Pages/Components/Data/Car/CarDetail.dart';

class CarVerticalImage extends StatefulWidget {
  final int carId;
  final String imageUrl;
  final String title;
  final String slug;
  final String description;
  final String price;
  final String note;
  final String policeNumber;

  const CarVerticalImage({
    Key? key,
    required this.carId,
    required this.imageUrl,
    required this.title,
    required this.slug,
    required this.description,
    required this.price,
    required this.note,
    required this.policeNumber,
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
            crossAxisAlignment: CrossAxisAlignment.start,
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
              Container(
                color: Colors.white.withOpacity(0.03),
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
              Column(
                crossAxisAlignment: CrossAxisAlignment.end,
                children: [
                  Container(
                    decoration: BoxDecoration(
                      color: Colors.white.withOpacity(0.03),
                      borderRadius: BorderRadius.zero,
                    ),
                    child: Padding(
                      padding: const EdgeInsets.fromLTRB(8, 4, 8, 4),
                      child: Text(
                        widget.policeNumber,
                        overflow: TextOverflow.ellipsis,
                        maxLines: 1,
                        style: const TextStyle(
                          color: Colors.white,
                          fontSize: 14,
                          fontWeight: FontWeight.w600,
                        ),
                      ),
                    ),
                  ),
                  Container(
                    margin: const EdgeInsets.only(left: 10),
                    child: Text(
                      widget.title,
                      overflow: TextOverflow.ellipsis,
                      maxLines: 2,
                      style: const TextStyle(
                          fontSize: 15, fontWeight: FontWeight.bold),
                    ),
                  ),
                ],
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
          slug: widget.slug,
          description: widget.description,
          note: widget.note,
          policeNumber: widget.policeNumber,
        ),
      ),
    );
  }
}

class CarListGrid extends StatelessWidget {
  final List<CarVerticalImage> cars;

  const CarListGrid({Key? key, required this.cars}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return GridView.count(
      crossAxisCount: 2,
      crossAxisSpacing: 10.0,
      mainAxisSpacing: 10.0,
      padding: const EdgeInsets.all(10.0),
      children: cars,
    );
  }
}
