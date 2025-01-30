<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>@yield('title', 'My Website')</title>
    <link rel="stylesheet" href="{{ asset('sass/main.scss') }}">
    @stack('styles') <!-- For additional styles in specific pages -->
</head>

<body>

    @include('site.layouts.main.header') <!-- Include the header -->

    <main>
        @yield('content') <!-- Dynamic content -->
    </main>

    @include('site.layouts.main.footer') <!-- Include the footer -->

    @stack('scripts') <!-- For additional scripts in specific pages -->
</body>

</html>
