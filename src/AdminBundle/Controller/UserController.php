<?php

namespace AdminBundle\Controller;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use AdminBundle\Form\UserType;
use AdminBundle\Form\AvatarType;
use AdminBundle\Form\ChangePasswordType;


class UserController extends Controller {

    public function indexAction() {
        $userManager = $this->get('fos_user.user_manager');
        $users = $userManager->findUsers();

        return $this->render(
            'AdminBundle:Users:index.html.twig', 
            array('users' =>  $users)
        );
    }

    public function updateAction($id, Request $request)
    {   
        // GET USER
        $userManager = $this->get('fos_user.user_manager');
        $user = $userManager->findUserBy(array('id' => $id));

        // GENERATE FORMS
        $form_user = $this->createForm(UserType::class, $user);
        $form_avatar = $this->createForm(AvatarType::class, $user, array(
                    'action' => $this->generateUrl('admin_update_user', 
                        array('id' => $id ))
                    ));

        // CHECK WHICH FORM HAS BEEN SUDMITTED 
        if ($request->request->has($form_avatar->getName())) {
            // AVATAR
            $form_avatar->handleRequest($request);
            if ($form_avatar->isSubmitted() && $form_avatar->isValid()) {
                // SET AVATAR
                $avatar = $user->getAvatar();
                $avatarName = $this->get('app.avatar_uploader')->upload($avatar);
                $user->setAvatar($avatarName);
                $userManager->updateUser($user);
                return $this->render(
                    'AdminBundle::Users/avatar.html.twig', 
                    array('user' =>  $user)
                );
            } 
        } else if ($request->request->has($form_user->getName())) {
            // USER
            $form_user->handleRequest($request);
            if ($form_user->isSubmitted() && $form_user->isValid())  {
                // SET USER
                $userManager->updateUser($user);

                $request->getSession()
                ->getFlashBag()
                ->add('success', 'user.update.flash.success');

                return $this->redirectToRoute('admin_show_users');
            } else {
                $form_user->getErrors();
            }
        }

        // RENDER VIEW
        return $this->render(
            'AdminBundle:Users:edit.html.twig', 
            array(
                'form_user' => $form_user->createView(), 
                'form_avatar' => $form_avatar->createView(), 
                'user' =>  $user
            )
        );
    }

	public function createAction(Request $request) 
    {   
        $userManager = $this->get('fos_user.user_manager');
        $user = $userManager->createUser();

        // GENERATE FORMS
        $form_user = $this->createForm(UserType::class, $user);

        $form_user->handleRequest($request);
        if ($form_user->isSubmitted() && $form_user->isValid()) {
            $userManager->updateUser($user);
            $id = $user->getId();

            $request->getSession()
            ->getFlashBag()
            ->add('success', 'user.create.flash.success');

            return $this->redirectToRoute('admin_update_user', 
                            array('id' => $id)
                          );
        }

        // RENDER VIEW
        return $this->render(
            'AdminBundle:Users:new.html.twig', 
            array(
                'form_user' => $form_user->createView(), 
                'user' =>  $user
            )
        );
    }

    public function changePasswordAction($id, Request $request)
    {   
        // GET USER
        $userManager = $this->get('fos_user.user_manager');
        $user = $userManager->findUserBy(array('id' => $id));

        // GENERATE FORMS
        $form_password = $this->createForm(ChangePasswordType::class, $user);

        $form_password->handleRequest($request);

        if ($form_password->isSubmitted() && $form_password->isValid())  {
            // SET USER
            $userManager->updateUser($user);

            $request->getSession()
            ->getFlashBag()
            ->add('success', 'user.change_password.flash.success');

            return $this->redirectToRoute('admin_show_users');
        } else {
            $form_password->getErrors();
        }

        // RENDER VIEW
        return $this->render(
            'AdminBundle:Users:change_password.html.twig', 
            array(
                'form_password' => $form_password->createView(), 
                'user' =>  $user
            )
        );
    }

    public function deleteAction($id) 
    {	
    	$userManager = $this->get('fos_user.user_manager');
        $user = $userManager->findUserBy(array('id' => $id));
		$userManager->deleteUser($user);

        return $this->redirectToRoute('admin_show_users');
    }

}