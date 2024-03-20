import 'package:flutter/material.dart';
import 'package:frontend/main.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:flutter_dotenv/flutter_dotenv.dart';
import 'package:getwidget/getwidget.dart';

class LoginPage extends StatefulWidget {
  @override
  _LoginPageState createState() => _LoginPageState();
}

class _LoginPageState extends State<LoginPage> {
  final _formKey = GlobalKey<FormState>();
  String _email = '';
  String _password = '';
  late String baseUrl;
  bool _isLoading = false;
  @override
  void initState() {
    super.initState();
    dotenv.load().then((_) {
      baseUrl = dotenv.env['BASE_URL']!;
    });
  }

  void _trySubmit() async {
    setState(() {
      _isLoading = true;
    });
    final isValid = _formKey.currentState!.validate();
    if (isValid) {
      _formKey.currentState!.save();

      final response = await http.post(
        Uri.parse('$baseUrl/api/login'),
        headers: <String, String>{
          'Content-Type': 'application/json; charset=UTF-8',
        },
        body: jsonEncode(<String, String>{
          'email': _email,
          'password': _password,
        }),
      );

      if (response.statusCode == 200) {
        GFToast.showToast(
          'You are logged in!',
          context,
          toastPosition: GFToastPosition.BOTTOM,
        );
        final responseData = jsonDecode(response.body);
        final token = responseData['data']['token'];
        final name = responseData['data']['name'];
        final email = responseData['data']['email'];
        final roles = responseData['data']['roles'];
        final prefs = await SharedPreferences.getInstance();
        await prefs.setString('token', token);
        await prefs.setString('name', name);
        await prefs.setString('email', email);
        await prefs.setString('roles', roles);
        Navigator.pushReplacement(
          context,
          MaterialPageRoute(
            builder: (context) => const NavigationBarApp(
              isLoggedIn: true,
            ),
          ),
        );
        setState(() {
          _isLoading = false;
        });
      } else {
        GFToast.showToast(
          'There is something wrong!',
          context,
          toastPosition: GFToastPosition.BOTTOM,
        );
        setState(() {
          _isLoading = false;
        });
      }
    } else {
      GFToast.showToast(
        'Enter data correctly!',
        context,
        toastPosition: GFToastPosition.BOTTOM,
      );
      setState(() {
        _isLoading = false;
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SingleChildScrollView(
        child: Padding(
          padding: const EdgeInsets.all(16.0),
          child: Column(
            children: [
              Stack(
                alignment: Alignment.topLeft,
                children: [
                  Image.network(
                    'https://c.pxhere.com/photos/13/e8/automobile_automotive_black_and_white_car_dark_vehicle-915436.jpg!d',
                    fit: BoxFit.contain,
                  ),
                ],
              ),
              Form(
                key: _formKey,
                child: Column(
                  children: [
                    TextFormField(
                      key: const ValueKey('email'),
                      decoration: InputDecoration(
                        hintText: 'Enter rabbit number',
                        border: OutlineInputBorder(
                          borderSide:
                              const BorderSide(color: Colors.amber, width: 4),
                          borderRadius: BorderRadius.circular(12),
                        ),
                      ),
                      validator: (value) {
                        if (value == null || value.isEmpty) {
                          return 'Please enter an email';
                        }
                        if (!RegExp(
                                r"[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?")
                            .hasMatch(value)) {
                          return 'Please enter a valid email';
                        }
                        return null;
                      },
                      onSaved: (value) {
                        _email = value!;
                      },
                    ),
                    TextFormField(
                      decoration: InputDecoration(
                        hintText: 'Enter rabbit number',
                        border: OutlineInputBorder(
                          borderSide:
                              const BorderSide(color: Colors.amber, width: 4),
                          borderRadius: BorderRadius.circular(12),
                        ),
                      ),
                      key: const ValueKey('password'),
                      obscureText: true,
                      validator: (value) {
                        if (value == null || value.isEmpty) {
                          return 'Please enter a password';
                        }
                        return null;
                      },
                      onSaved: (value) {
                        _password = value!;
                      },
                    ),
                    const SizedBox(height: 16),
                    Center(
                      child: ElevatedButton(
                        onPressed: _isLoading ? null : _trySubmit,
                        style: ElevatedButton.styleFrom(
                          backgroundColor: Colors.white.withOpacity(0.1),
                          foregroundColor: Colors.white,
                          shape: RoundedRectangleBorder(
                            borderRadius: BorderRadius.circular(10),
                          ),
                          padding: const EdgeInsets.symmetric(
                              vertical: 4, horizontal: 34),
                          textStyle: const TextStyle(
                            fontSize: 14,
                            fontWeight: FontWeight.bold,
                          ),
                        ),
                        child: const Text('Login'),
                      ),
                    ),
                    // GFButton(
                    //   onPressed: _trySubmit,
                    //   text: 'Update Car',
                    //   size: GFSize.LARGE,
                    //   blockButton: true,
                    // ),
                  ],
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
