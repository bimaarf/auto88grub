import 'package:flutter/material.dart';
import 'package:frontend/Pages/Components/Data/Master/Transmission/TransmissionPage.dart';

class TransmissionMenuGeneral extends StatelessWidget {
  const TransmissionMenuGeneral({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return const Row(
      crossAxisAlignment: CrossAxisAlignment.center,
      mainAxisAlignment: MainAxisAlignment.center,
      children: [
        TransmissionItem(),
      ],
    );
  }
}

class TransmissionItem extends StatelessWidget {
  const TransmissionItem({Key? key}) : super(key: key);

  void _navigateToPage(BuildContext context) {
    Navigator.push(
      context,
      MaterialPageRoute(
        builder: (context) => TransmissionPage(),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(10),
      width: 90,
      height: 90,
      child: Ink(
        decoration: BoxDecoration(
          color: Colors.white.withOpacity(0.04),
          borderRadius: BorderRadius.circular(100),
          boxShadow: const [
            BoxShadow(
              color: Colors.black12,
              spreadRadius: 3,
              blurRadius: 5,
              offset: Offset(0, 3),
            ),
          ],
        ),
        child: InkWell(
          onTap: () => _navigateToPage(context),
          borderRadius: BorderRadius.circular(100),
          child: const Column(
            mainAxisAlignment: MainAxisAlignment.center,
            crossAxisAlignment: CrossAxisAlignment.center,
            children: [
              Icon(
                Icons.color_lens,
                size: 30,
                color: Colors.blue,
              ),
              Text(
                'Transmission',
                style: TextStyle(
                  fontSize: 12,
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
