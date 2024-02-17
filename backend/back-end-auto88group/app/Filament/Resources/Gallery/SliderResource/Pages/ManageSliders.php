<?php

namespace App\Filament\Resources\Gallery\SliderResource\Pages;

use App\Filament\Resources\Gallery\SliderResource;
use App\Models\Gallery\Slider;
use Filament\Resources\Pages\ManageRecords;

class ManageSliders extends ManageRecords
{
    protected static string $resource = SliderResource::class;

    protected function getActions(): array
    {
        return [
            \Filament\Actions\CreateAction::make()
                ->mutateFormDataUsing(
                    function (array $data): array {
                        $total = Slider::count();

                        $data['order_column'] = $total++;

                        return $data;
                    },
                )->createAnother(false),
        ];
    }

    public function getTabs(): array
    {
        return [
            'banner' => \Filament\Resources\Components\Tab::make()->query(fn ($query) => $query->where('category', 'Banner')->orderBy('order_column')),
        ];
    }
}
