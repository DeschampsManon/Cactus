<?php

namespace AdminBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use AdminBundle\Form\UserType;

class UserController extends Controller {

    public function indexAction() {
        $userManager = $this->get('fos_user.user_manager');
        $users = $userManager->findUsers();

        return $this->render('AdminBundle:Users:index.html.twig', array('users' =>  $users));
    }

    public function updateAction($id,Request $request)
    {
        $userManager = $this->get('fos_user.user_manager');
        $user = $userManager->findUserBy(array('id' => $id));

        $form = $this->createForm(UserType::class, $user);

        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $userManager = $this->container->get('fos_user.user_manager');
            $userManager->updateUser($user);
            return $this->redirectToRoute('admin_show_users');
        }

        return $this->render(
            'AdminBundle:Users:edit.html.twig', 
            array('form' => $form->createView(), 'user' =>  $user)
        );
    }

	public function createAction() {
        
    }



}