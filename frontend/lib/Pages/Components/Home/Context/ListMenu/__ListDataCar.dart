import 'package:flutter/material.dart';
import 'package:frontend/Pages/Components/Data/Master/Brand/BrandPage.dart';
import 'package:frontend/Pages/Components/Home/Context/CarDataBox/CarMenu.dart';
import 'package:frontend/Pages/Components/Home/Context/SiteDataBox/QuestionMenu.dart';

class ListDataCar extends StatelessWidget {
  const ListDataCar({Key? key}) : super(key: key);

  void _navigateToPage(BuildContext context) {
    Navigator.push(
      context,
      MaterialPageRoute(
        builder: (context) => BrandPage(),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return const Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Row(
          mainAxisAlignment: MainAxisAlignment.start,
          crossAxisAlignment: CrossAxisAlignment.center,
          children: [
            Text(
              'General',
              textAlign: TextAlign.right,
              style: TextStyle(
                color: Colors.white,
                fontWeight: FontWeight.bold,
              ),
            ),
            SizedBox(width: 4),
            Icon(
              Icons.account_balance,
              size: 14,
              color: Colors.white,
            )
          ],
        ),
        SizedBox(height: 8),
        Row(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Expanded(child: CarMenu()),
            SizedBox(width: 10),
            Expanded(child: FaqMenu()),
          ],
        ),
        SizedBox(height: 8),
      ],
    );
  }
}
