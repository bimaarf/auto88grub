import 'package:flutter/material.dart';
import 'package:frontend/Pages/Components/Data/Master/Cylinder/CylinderPage.dart';

class CylinderMenuGeneral extends StatelessWidget {
  const CylinderMenuGeneral({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return const Row(
      crossAxisAlignment: CrossAxisAlignment.center,
      mainAxisAlignment: MainAxisAlignment.center,
      children: [
        CylinderItem(),
      ],
    );
  }
}

class CylinderItem extends StatelessWidget {
  const CylinderItem({Key? key}) : super(key: key);

  void _navigateToPage(BuildContext context) {
    Navigator.push(
      context,
      MaterialPageRoute(
        builder: (context) => CylinderPage(),
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
                Icons.build,
                size: 30,
                color: Colors.blue,
              ),
              Text(
                'Cylinder',
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
