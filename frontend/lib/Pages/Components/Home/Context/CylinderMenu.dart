import 'package:flutter/material.dart';
import 'package:frontend/Pages/Components/Data/Master/Cylinder/CylinderPage.dart';

class CylinderMenu extends StatelessWidget {
  const CylinderMenu({Key? key}) : super(key: key);

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
    return GestureDetector(
      onTap: () => _navigateToPage(context),
      child: Material(
        color: Colors.transparent,
        child: Ink(
          decoration: BoxDecoration(
            color: Colors.white.withOpacity(0.04),
            borderRadius: BorderRadius.circular(10),
            boxShadow: const [
              BoxShadow(
                color: Colors.black12,
                spreadRadius: 3,
                blurRadius: 5,
              ),
            ],
          ),
          child: InkWell(
            onTap: () => _navigateToPage(context),
            borderRadius: BorderRadius.circular(10),
            child: Container(
              decoration: BoxDecoration(
                color: Colors.white.withOpacity(0.04),
                borderRadius: BorderRadius.circular(10),
              ),
              padding: const EdgeInsets.all(10),
              child: const Column(
                crossAxisAlignment: CrossAxisAlignment.center,
                children: [
                  Icon(
                    Icons.build,
                    size: 50,
                    color: Colors.blue,
                  ),
                  SizedBox(height: 10),
                  Text(
                    'Cylinder',
                    style: TextStyle(color: Colors.white),
                  ),
                ],
              ),
            ),
          ),
        ),
      ),
    );
  }
}
