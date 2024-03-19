import 'package:flutter/material.dart';
import 'package:frontend/Pages/Components/Data/Master/Brand/BrandPage.dart';
import 'package:frontend/Pages/Components/Menu/Box/LandingPage/Vacancy/_VacancyMenuBox.dart';
import 'package:frontend/Pages/Components/Menu/Box/LandingPage/Question/_QuestionMenuBox.dart';
import 'package:frontend/Pages/Components/Menu/Box/LandingPage/Slider/_SliderMenuBox.dart';

class LandingPage extends StatelessWidget {
  const LandingPage({Key? key}) : super(key: key);

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
            Expanded(child: SliderMenuBox()),
            SizedBox(width: 10),
            Expanded(child: QuestionMenuBox()),
          ],
        ),
        SizedBox(height: 8),
        Row(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Expanded(child: VacancyMenuBox()),
          ],
        ),
        SizedBox(height: 8),
      ],
    );
  }
}
