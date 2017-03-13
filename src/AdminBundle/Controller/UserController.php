<?php

namespace AdminBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use AdminBundle\Form\UserType;

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
        $userManager = $this->get('fos_user.user_manager');
        $user = $userManager->findUserBy(array('id' => $id));

        $form = $this->createForm(UserType::class, $user);

        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {

            $avatar = $user->getAvatar();
            $avatarName = $this->get('app.avatar_uploader')->upload($avatar);

            $userManager->updateUser($user);
            return $this->redirectToRoute('admin_show_users');
            
        }

        return $this->render(
            'AdminBundle:Users:edit.html.twig', 
            array('form' => $form->createView(), 'user' =>  $user)
        );
    }

	public function createAction(Request $request) 
    {   
        $userManager = $this->get('fos_user.user_manager');
        $user = $userManager->createUser();

        $form = $this->createForm(UserType::class, $user);

        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {

            $avatar = $user->getAvatar();
            $avatarName = $this->get('app.avatar_uploader')->upload($avatar);
            // $avatar->move(
            //     $this->getParameter('avatars_directory'),
            //     $avatarName
            // );

            $userManager->updateUser($user);
            return $this->redirectToRoute('admin_show_users');

        }

        return $this->render(
            'AdminBundle:Users:new.html.twig', 
            array('form' => $form->createView(), 'user' =>  $user)
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