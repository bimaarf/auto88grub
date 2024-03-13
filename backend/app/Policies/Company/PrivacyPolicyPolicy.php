<?php

namespace App\Policies\Company;

use App\Models\User;
use App\Models\Company\PrivacyPolicy;
use Illuminate\Auth\Access\HandlesAuthorization;

class PrivacyPolicyPolicy
{
    use HandlesAuthorization;

    /**
     * DePrivacyPolicyine whether the user can view any models.
     *
     * @param  \App\Models\User  $user
     * @return bool
     */
    public function viewAny(User $user): bool
    {
        return $user->can('view_any_company::privacypolicy');
    }

    /**
     * DePrivacyPolicyine whether the user can view the model.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\Company\PrivacyPolicy  $policy
     * @return bool
     */
    public function view(User $user, PrivacyPolicy $policy): bool
    {
        return $user->can('view_company::privacypolicy');
    }

    /**
     * DePrivacyPolicyine whether the user can create models.
     *
     * @param  \App\Models\User  $user
     * @return bool
     */
    public function create(User $user): bool
    {
        return $user->can('create_company::privacypolicy');
    }

    /**
     * DePrivacyPolicyine whether the user can update the model.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\Company\PrivacyPolicy  $policy
     * @return bool
     */
    public function update(User $user, PrivacyPolicy $policy): bool
    {
        return $user->can('update_company::privacypolicy');
    }

    /**
     * DePrivacyPolicyine whether the user can delete the model.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\Company\PrivacyPolicy  $policy
     * @return bool
     */
    public function delete(User $user, PrivacyPolicy $policy): bool
    {
        return $user->can('delete_company::privacypolicy');
    }

    /**
     * DePrivacyPolicyine whether the user can bulk delete.
     *
     * @param  \App\Models\User  $user
     * @return bool
     */
    public function deleteAny(User $user): bool
    {
        return $user->can('delete_any_company::privacypolicy');
    }

    /**
     * DePrivacyPolicyine whether the user can permanently delete.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\Company\PrivacyPolicy  $policy
     * @return bool
     */
    public function forceDelete(User $user, PrivacyPolicy $policy): bool
    {
        return $user->can('force_delete_company::privacypolicy');
    }

    /**
     * DePrivacyPolicyine whether the user can permanently bulk delete.
     *
     * @param  \App\Models\User  $user
     * @return bool
     */
    public function forceDeleteAny(User $user): bool
    {
        return $user->can('force_delete_any_company::privacypolicy');
    }

    /**
     * DePrivacyPolicyine whether the user can restore.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\Company\PrivacyPolicy  $policy
     * @return bool
     */
    public function restore(User $user, PrivacyPolicy $policy): bool
    {
        return $user->can('restore_company::privacypolicy');
    }

    /**
     * DePrivacyPolicyine whether the user can bulk restore.
     *
     * @param  \App\Models\User  $user
     * @return bool
     */
    public function restoreAny(User $user): bool
    {
        return $user->can('restore_any_company::privacypolicy');
    }

    /**
     * DePrivacyPolicyine whether the user can replicate.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\Company\PrivacyPolicy  $policy
     * @return bool
     */
    public function replicate(User $user, PrivacyPolicy $policy): bool
    {
        return $user->can('replicate_company::privacypolicy');
    }

    /**
     * DePrivacyPolicyine whether the user can reorder.
     *
     * @param  \App\Models\User  $user
     * @return bool
     */
    public function reorder(User $user): bool
    {
        return $user->can('reorder_company::privacypolicy');
    }

}
