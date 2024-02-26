import 'package:flutter/material.dart';

class CardCarDetail extends StatelessWidget {
  final String imageUrl;
  final String title;
  final String subtitle;
  final String note;

  const CardCarDetail({
    Key? key,
    required this.imageUrl,
    required this.title,
    required this.subtitle,
    required this.note,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: NotificationListener<ScrollNotification>(
        onNotification: (scrollNotification) {
          return false;
        },
        child: Stack(
          children: [
            Positioned.fill(
              child: SingleChildScrollView(
                physics: const AlwaysScrollableScrollPhysics(),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Image.network(
                      imageUrl,
                      height: 250,
                      width: double.infinity,
                      fit: BoxFit.cover,
                    ),
                    ListTile(
                      title: Text(
                        title,
                        style: const TextStyle(fontWeight: FontWeight.bold),
                      ),
                    ),
                    Container(
                      color: Colors.white,
                      padding: const EdgeInsets.all(10),
                      width: double.infinity,
                      child: const Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text(
                            'asdasdlorem asdasddasadasdasdsda,asdasd,asd,a asd, asd ,asd ,as',
                            style: TextStyle(color: Colors.black),
                          ),
                        ],
                      ),
                    ),
                    // Add more widgets as needed
                  ],
                ),
              ),
            ),
            AnimatedBuilder(
              animation: ModalRoute.of(context)!.animation!,
              builder: (context, child) {
                return Positioned(
                  top: 0,
                  left: 0,
                  right: 0,
                  child: Container(
                    color: Color.lerp(
                        Colors.red.withOpacity(0),
                        Colors.black.withOpacity(0.3),
                        ModalRoute.of(context)!.animation!.value),
                    padding: const EdgeInsets.fromLTRB(16, 16, 16, 16),
                    child: Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        InkWell(
                          onTap: () {
                            Navigator.of(context).pop();
                          },
                          child: const Icon(Icons.arrow_back,
                              color: Colors.white, size: 30),
                        ),
                        InkWell(
                          onTap: () {
                            Navigator.of(context).pop();
                          },
                          child: const Icon(Icons.menu_open,
                              color: Colors.white, size: 30),
                        ),
                      ],
                    ),
                  ),
                );
              },
            ),
          ],
        ),
      ),
    );
  }
}
