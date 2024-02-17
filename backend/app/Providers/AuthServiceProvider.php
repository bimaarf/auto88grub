<?php

namespace App\Providers;

use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * The policy mappings for the application.
     *
     * @var array<class-string, class-string>
     */
    protected $policies = [
        'App\Models\Area\City' => 'App\Policies\Area\CityPolicy',
        'App\Models\Area\District' => 'App\Policies\Area\DistrictPolicy',
        'App\Models\Area\Province' => 'App\Policies\Area\ProvincePolicy',
        'App\Models\Area\Subdistrict' => 'App\Policies\Area\SubdistrictPolicy',

        'App\Models\Blog\Author' => 'App\Policies\Blog\AuthorPolicy',
        'App\Models\Blog\Category' => 'App\Policies\Blog\CategoryPolicy',
        'App\Models\Blog\Post' => 'App\Policies\Blog\PostPolicy',

        'App\Models\Car\Brand' => 'App\Policies\Car\BrandPolicy',
        'App\Models\Car\Color' => 'App\Policies\Car\ColorPolicy',
        'App\Models\Car\Cylinder' => 'App\Policies\Car\CylinderPolicy',
        'App\Models\Car\Fuel' => 'App\Policies\Car\FuelPolicy',
        'App\Models\Car\Gear' => 'App\Policies\Car\GearPolicy',
        'App\Models\Car\Kind' => 'App\Policies\Car\KindPolicy',
        'App\Models\Car\Model' => 'App\Policies\Car\ModelPolicy',
        'App\Models\Car\Row' => 'App\Policies\Car\RowPolicy',
        'App\Models\Car\Series' => 'App\Policies\Car\SeriesPolicy',
        'App\Models\Car\Transmission' => 'App\Policies\Car\TransmissionPolicy',
        'App\Models\Car\Type' => 'App\Policies\Car\TypePolicy',
        'App\Models\Car\Year' => 'App\Policies\Car\YearPolicy',

        'App\Models\Company\AboutUs' => 'App\Policies\Company\AboutUsPolicy',
        'App\Models\Company\Consultation' => 'App\Policies\Company\ConsultationPolicy',
        'App\Models\Company\Credit' => 'App\Policies\Company\CreditPolicy',
        'App\Models\Company\Term' => 'App\Policies\Company\TermPolicy',
        'App\Models\Company\TradeIn' => 'App\Policies\Company\TradeInPolicy',
        'App\Models\Company\VisitUs' => 'App\Policies\Company\VisitUsPolicy',

        'App\Models\Description\Category' => 'App\Policies\Description\CategoryPolicy',
        'App\Models\Description\Detail' => 'App\Policies\Description\DetailPolicy',

        'App\Models\FAQ\Category' => 'App\Policies\FAQ\CategoryPolicy',
        'App\Models\FAQ\Question' => 'App\Policies\FAQ\QuestionPolicy',

        'App\Models\Gallery\Feed' => 'App\Policies\Gallery\FeedPolicy',
        'App\Models\Gallery\Slider' => 'App\Policies\Gallery\SliderPolicy',
        'App\Models\Gallery\Story' => 'App\Policies\Gallery\StoryPolicy',

        'App\Models\Job\Application' => 'App\Policies\Job\ApplicationPolicy',
        'App\Models\Job\Vacancy' => 'App\Policies\Job\VacancyPolicy',

        'App\Models\Location\Box' => 'App\Policies\Location\BoxPolicy',
        'App\Models\Location\Car' => 'App\Policies\Location\CarPolicy',

        'App\Models\Main\Car' => 'App\Policies\Main\CarPolicy',
        'App\Models\Main\Document' => 'App\Policies\Main\DocumentPolicy',
        'App\Models\Main\Ecommerce' => 'App\Policies\Main\EcommercePolicy',
        'App\Models\Main\Promo' => 'App\Policies\Main\PromoPolicy',
        'App\Models\Main\Testimonial' => 'App\Policies\Main\TestimonialPolicy',

        'App\Models\Other\CustomerService' => 'App\Policies\Other\CustomerServicePolicy',
        'App\Models\Other\Leasing' => 'App\Policies\Other\LeasingPolicy',
        'App\Models\Other\Youtube' => 'App\Policies\Other\YoutubePolicy',

        'App\Models\Shop\Brand' => 'App\Policies\Shop\BrandPolicy',
        'App\Models\Shop\Category' => 'App\Policies\Shop\CategoryPolicy',
        'App\Models\Shop\Customer' => 'App\Policies\Shop\CustomerPolicy',
        'App\Models\Shop\Order' => 'App\Policies\Shop\OrderPolicy',
        'App\Models\Shop\Product' => 'App\Policies\Shop\ProductPolicy',

        'App\Models\User' => 'App\Policies\UserPolicy',

        'Spatie\Permission\Models\Role' => 'App\Policies\RolePolicy',
    ];

    /**
     * Register any authentication / authorization services.
     *
     * @return void
     */
    public function boot()
    {
        //
    }
}
