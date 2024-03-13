import 'package:flutter/material.dart';
import 'package:frontend/Pages/Components/Data/Master/Brand/BrandPage.dart';
import 'package:frontend/Pages/Components/Home/Context/SiteDataBox/QuestionMenu.dart';
import 'package:frontend/Pages/Components/Home/Context/SiteDataBox/SliderMenu.dart';
import 'package:frontend/Pages/Components/Home/Context/SiteDataBox/VacancyMenu.dart';

class ListDataSite extends StatelessWidget {
  const ListDataSite({Key? key}) : super(key: key);

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
              'Landing Page',
              textAlign: TextAlign.right,
              style: TextStyle(
                color: Colors.white,
                fontWeight: FontWeight.bold,
              ),
            ),
            SizedBox(width: 4),
            Icon(
              Icons.web_asset,
              size: 14,
              color: Colors.white,
            )
          ],
        ),
        SizedBox(height: 8),
        Row(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Expanded(child: SliderMenu()),
            SizedBox(width: 10),
            Expanded(child: FaqMenu()),
          ],
        ),
        SizedBox(height: 8),
        Row(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Expanded(child: VacancyMenu()),
            SizedBox(width: 10),
          ],
        ),
        SizedBox(height: 8),
      ],
    );
  }
}
