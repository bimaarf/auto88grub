import 'package:flutter/material.dart';
import 'package:frontend/Pages/Components/Data/Master/Brand/BrandPage.dart';
import 'package:frontend/Pages/Components/Home/Context/BrandMenu.dart';
import 'package:frontend/Pages/Components/Home/Context/BrankasMenu.dart';
import 'package:frontend/Pages/Components/Home/Context/ColorMenu.dart';
import 'package:frontend/Pages/Components/Home/Context/CoordinateMenu.dart';
import 'package:frontend/Pages/Components/Home/Context/CylinderMenu.dart';
import 'package:frontend/Pages/Components/Home/Context/FuelMenu.dart';
import 'package:frontend/Pages/Components/Home/Context/GearMenu.dart';
import 'package:frontend/Pages/Components/Home/Context/KindeMenu.dart';
import 'package:frontend/Pages/Components/Home/Context/ModelMenu.dart';
import 'package:frontend/Pages/Components/Home/Context/SeriesMenu.dart';
import 'package:frontend/Pages/Components/Home/Context/TransmissionMenu.dart';
import 'package:frontend/Pages/Components/Home/Context/TypeMenu.dart';
import 'package:frontend/Pages/Components/Home/FirstMenuList.dart';

class ListDataMaster extends StatelessWidget {
  const ListDataMaster({Key? key}) : super(key: key);

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
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Container(
          margin: const EdgeInsets.only(top: 10, bottom: 10),
          decoration: BoxDecoration(
            color: Colors.white.withOpacity(0.1),
            borderRadius: BorderRadius.circular(10),
          ),
          child: const FirstMenuList(),
        ),
        const Row(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Expanded(child: BrankasMenu()),
            SizedBox(width: 10),
            Expanded(child: CoordinateMenu()),
          ],
        ),
        const SizedBox(height: 10),
        const Row(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Expanded(child: BrandMenu()),
            SizedBox(width: 10),
            Expanded(child: ModelMenu()),
          ],
        ),
        const SizedBox(height: 10),
        const Row(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Expanded(child: TypeMenu()),
            SizedBox(width: 10),
            Expanded(child: KindMenu()),
          ],
        ),
        const SizedBox(height: 10),
        const Row(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Expanded(child: CylinderMenu()),
            SizedBox(width: 10),
            Expanded(child: TransmissionMenu()),
          ],
        ),
        const SizedBox(height: 10),
        const Row(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Expanded(child: SeriesMenu()),
            SizedBox(width: 10),
            Expanded(child: GearMenu()),
          ],
        ),
        const SizedBox(height: 10),
        const Row(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Expanded(child: FuelMenu()),
            SizedBox(width: 10),
            Expanded(child: ColorMenu()),
          ],
        ),
      ],
    );
  }
}
