<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>@yield('title', 'Vltava')</title>
    @vite('resources/sass/main.scss')
    @stack('styles') <!-- For additional styles in specific pages -->
</head>

<body>

    @include('layouts.main.vltava-header') <!-- Include the header -->

    <main>
        @yield('content') <!-- Dynamic content -->
    </main>

    @include('layouts.main.vltava-footer') <!-- Include the footer -->

    @stack('scripts') <!-- For additional scripts in specific pages -->
</body>

</html>
