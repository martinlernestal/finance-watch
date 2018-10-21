import React, { Component } from 'react'
import { Scene } from 'react-babylonjs'
import { Vector3, ArcRotateCamera, MeshBuilder, HemisphericLight, StandardMaterial, Color3 } from 'babylonjs';

// omittar BABYLON eftersom man importerar direkt från babylon modulen

export default class ThreeDView extends Component 
{
  onMeshPicked(mesh) {
    console.log('mesh picked:', mesh)
  }

  onSceneMount(e) {
    const { canvas, scene } = e
  
    scene.clearColor = new Color3(33/255, 37/255, 41/255);

    var camera = new ArcRotateCamera("Camera", 0, 1.05, 6, Vector3.Zero(), scene)
    camera.attachControl(canvas)

    new HemisphericLight('light', Vector3.Up(), scene);

    // det är här man skapar allt

    // material
	var mat = new StandardMaterial("mat1", scene);
	mat.alpha = 1.0;
	mat.diffuseColor = new Color3(0.5, 0.5, 1.0);
	mat.backFaceCulling = false;
	mat.wireframe = true;
	
	// paths
	var path1;
	var path2;
	var path3;
	var path4;
	path1 = [];
	path2 = [];
	path3 = [];
	path4 = [];
	for (var i = -10; i < 12; i++) {
		path1.push( new Vector3(i, 2, 0) );
		path2.push( new Vector3(i, 1, 0) );
		path3.push( new Vector3(i-1, -2, -1) );
		path4.push( new Vector3(i+1, -4, 1) );
	}
	for( var i = 6; i < 10; i++ ) {
		path2.push( new Vector3(i, 1, 0));
		path3.push( new Vector3(i-1, -2, -1));
	}
	
	// ribbon
	var ribbon = MeshBuilder.CreateRibbon("ribbon", {pathArray: [path1, path2]}, scene);
	ribbon.material = mat;
	



    scene.getEngine().runRenderLoop(() => {
        if (scene) {
            scene.render();
        }
    });
}

render() {
  return (
    <Scene
      onMeshPicked={this.onMeshPicked}
      onSceneMount={this.onSceneMount}
    />)
  }
}