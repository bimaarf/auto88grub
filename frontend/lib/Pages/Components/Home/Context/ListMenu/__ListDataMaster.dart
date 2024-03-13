import 'package:flutter/material.dart';
import 'package:frontend/Pages/Components/Data/Master/Brand/BrandPage.dart';
import 'package:frontend/Pages/Components/Home/Context/MasterDataBox/BrandMenu.dart';
import 'package:frontend/Pages/Components/Home/Context/MasterDataBox/BrankasMenu.dart';
import 'package:frontend/Pages/Components/Home/Context/MasterDataBox/ColorMenu.dart';
import 'package:frontend/Pages/Components/Home/Context/MasterDataBox/CoordinateMenu.dart';
import 'package:frontend/Pages/Components/Home/Context/MasterDataBox/CylinderMenu.dart';
import 'package:frontend/Pages/Components/Home/Context/MasterDataBox/FuelMenu.dart';
import 'package:frontend/Pages/Components/Home/Context/MasterDataBox/GearMenu.dart';
import 'package:frontend/Pages/Components/Home/Context/MasterDataBox/KindeMenu.dart';
import 'package:frontend/Pages/Components/Home/Context/MasterDataBox/ModelMenu.dart';
import 'package:frontend/Pages/Components/Home/Context/MasterDataBox/SeriesMenu.dart';
import 'package:frontend/Pages/Components/Home/Context/MasterDataBox/TransmissionMenu.dart';
import 'package:frontend/Pages/Components/Home/Context/MasterDataBox/TypeMenu.dart';

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
    return const Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Row(
          mainAxisAlignment: MainAxisAlignment.start,
          crossAxisAlignment: CrossAxisAlignment.center,
          children: [
            Text(
              'Master Data',
              textAlign: TextAlign.right,
              style: TextStyle(
                color: Colors.white,
                fontWeight: FontWeight.bold,
              ),
            ),
            SizedBox(width: 4),
            Icon(
              Icons.new_releases,
              size: 14,
              color: Colors.white,
            )
          ],
        ),
        SizedBox(height: 8),
        Row(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Expanded(child: BrankasMenu()),
            SizedBox(width: 10),
            Expanded(child: CoordinateMenu()),
          ],
        ),
        SizedBox(height: 10),
        Row(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Expanded(child: BrandMenu()),
            SizedBox(width: 10),
            Expanded(child: ModelMenu()),
          ],
        ),
        SizedBox(height: 10),
        Row(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Expanded(child: TypeMenu()),
            SizedBox(width: 10),
            Expanded(child: KindMenu()),
          ],
        ),
        SizedBox(height: 10),
        Row(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Expanded(child: CylinderMenu()),
            SizedBox(width: 10),
            Expanded(child: TransmissionMenu()),
          ],
        ),
        SizedBox(height: 10),
        Row(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Expanded(child: SeriesMenu()),
            SizedBox(width: 10),
            Expanded(child: GearMenu()),
          ],
        ),
        SizedBox(height: 10),
        Row(
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
