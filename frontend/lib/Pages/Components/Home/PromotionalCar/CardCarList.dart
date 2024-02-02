import 'package:flutter/material.dart';
import 'package:frontend/Pages/Components/Home/PromotionalCar/CardCarDetail.dart';
import 'package:frontend/Pages/Components/Home/PromotionalCar/CardImage.dart';

class CardCarList extends StatelessWidget {
  const CardCarList({
    Key? key,
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
              style:
                  TextStyle(color: Colors.black, fontWeight: FontWeight.bold),
            ),
            Icon(
              Icons.discount,
              size: 10,
              color: Color.fromARGB(255, 247, 181, 0),
            )
          ],
        ),
        SingleChildScrollView(
          scrollDirection: Axis.horizontal,
          child: Row(
            crossAxisAlignment: CrossAxisAlignment.center,
            children: List.generate(
              10,
              (index) => const Padding(
                padding: EdgeInsets.all(0),
                child: CardCardItem(), // Assuming CardCarItem is your widget
              ),
            ),
          ),
        ),
      ],
    );
  }
}

class CardCardItem extends StatefulWidget {
  const CardCardItem({Key? key}) : super(key: key);

  @override
  State<CardCardItem> createState() => _CardCardItemState();
}

class _CardCardItemState extends State<CardCardItem> {
  double scaleValue = 1.0;
  void _navigateToDetailCar(BuildContext context) {
    // Use Navigator to push a new route

    Navigator.push(
      context,
      MaterialPageRoute(
        builder: (context) => const CardCarDetail(
            imageUrl:
                'https://www.auto88group.com/image/car/1085/320230418090502.jpg',
            title: 'Detail',
            subtitle: 'asdasd',
            note: 'asdads'),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Expanded(
        child: GestureDetector(
      onTapDown: (_) {
        setState(() {
          scaleValue = 0.98; // Set the scale value on tap down
        });
      },
      onTapUp: (_) {
        setState(() {
          scaleValue = 1.0; // Reset the scale value on tap up
        });
        _navigateToDetailCar(context);
      },
      onTapCancel: () {
        setState(() {
          scaleValue = 1.0; // Reset the scale value on tap cancel
        });
      },
      child: AnimatedContainer(
        duration:
            const Duration(milliseconds: 200), // Adjust the duration as needed
        transform: Matrix4.diagonal3Values(scaleValue, scaleValue, 1.0),
        child: Container(
          width: 200,
          height: 200,
          decoration: BoxDecoration(
            color: Colors.white,
            borderRadius: BorderRadius.circular(5),
          ),
          child: const CardWithImage(
            imageUrl:
                'https://www.auto88group.com/image/car/1085/320230418090502.jpg',
            title: 'TOYOTA KIJANG (SILVER) TIPE LGX 2.0 A/T (2000)',
            subtitle: 'Rp 1x0.000.000',
            note: 'MINIBUS / LUX / PREMIUM',
          ),
        ),
      ),
    ));
  }
}
